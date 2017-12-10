// (c) 2012 Kyle Graehl / Patrick Williams, BitTorrent Inc.
// Btapp may be freely distributed under the MIT license.
// For all details and documentation:
// http://pwmckenna.github.com/btapp

(function() {
    "use strict";

    function assert(b, err) { if(!b) { throw err; } }

    //validate dependencies
    assert(typeof JSON !== 'undefined', 'JSON is a hard dependency');
    assert(typeof _ !== 'undefined', 'underscore/lodash is a hard dependency');
    assert(typeof jQuery !== 'undefined', 'jQuery is a hard dependency');

    function isMac() {
        var match = navigator.userAgent.match(/Macintosh/);
        return match !== undefined && match !== null;
    }

    var add_plugin = _.memoize(function(mime_type) {
        var ret = new jQuery.Deferred();
        var obj = document.createElement('object');
        var onload = mime_type + '_onload';
        window[onload] = function() {
            ret.resolve();
        };
        var div = document.createElement('div');            
        jQuery(div).css({'position':'absolute','left':'-999em','z-index':-1});
        div.innerHTML =
            '<object type="' + mime_type + '" width="0" height="0">' +
                '<param name="onload" value="' + onload + '" />' +
            '</object>';

        document.body.appendChild(div);
        return ret;
    });

    //utility function to wait for some condition
    //this ends up being helpful as we toggle between a flow chart and a state diagram
    function when(condition, functionality, interval) {
        var when_func = function() {
            if(condition.call()) {
                functionality.call();
            } else {
                setTimeout(when_func, interval || 500);
            }
        };
        _.defer(when_func);
    }

    function getCSS(url) {
        jQuery(document.createElement('link') ).attr({
            href: url,
            type: 'text/css',
            rel: 'stylesheet'
        }).appendTo('head');
    }
    
    function initializeFacebox() {
        jQuery.facebox.settings.overlay = true; // to disable click outside overlay to disable it
        jQuery.facebox.settings.closeImage = 
            'https://torque.bittorrent.com/facebox/src/closelabel.png';
        jQuery.facebox.settings.loadingImage = 
            'https://torque.bittorrent.com/facebox/src/loading.gif';                     
        jQuery.facebox.settings.opacity = 0.6;
    }

    this.PluginManagerView = Backbone.View.extend({
        initialize: function(options) {
            this.model.on('plugin:install_plugin', this.download, this);
            this.model.on('plugin:plugin_updated', this.restart, this);
        },
        setup: function(callback, context) {
            //make sure that we've loaded what we need to display
            if(typeof jQuery.facebox === 'undefined') {
                getCSS('https://torque.bittorrent.com/facebox/src/facebox.css');
                jQuery.getScript(
                    'https://torque.bittorrent.com/facebox/src/facebox.js', 
                    _.bind(this.setup, this, callback, context)
                );
                return;
            }

            initializeFacebox();
            callback.call(context);
        },
        restart: function(options) {
            options.abort = true;

            this.setup(function() {
                var dialog = jQuery('<div></div>');
                dialog.attr('id', 'plugin_download');
                dialog.css('position', 'absolute');
                dialog.css('height', '200px');
                dialog.css('width', '400px');
                dialog.css('left', '%50');
                dialog.css('margin-left', '-200px');

                var paragraph = jQuery('<p></p>');
                paragraph.text('The ' + this.model.get('product') + ' plugin needs to complete an update. Please restart your browser.');
                dialog.append(paragraph);

                dialog.hide();
                jQuery('body').append(dialog);
                jQuery.facebox({ div: '#plugin_download' });
            }, this);
        },
        download: function(options) {
            options.install = true;

            this.setup(function() {
                var dialog = jQuery('<div></div>');
                dialog.attr('id', 'plugin_download');
                dialog.css('position', 'absolute');
                dialog.css('height', '200px');
                dialog.css('width', '400px');
                dialog.css('left', '%50');
                dialog.css('margin-left', '-200px');

                var button_url = this.model.get('download_url');
                var html ='<p style="text-align:center;">' + 
                    'This site requires the ' + this.model.get('product') + ' plugin.<br>' + 
                    '<span style="font-size:8pt;">By installing this software, you<br>are agreeing to the <a href="http://www.bittorrent.com/legal/eula">EULA</a></span><br><br>' + 
                    '<a class="btn" id="download" href="' + button_url + '">Download</a>' + '</p>';
                dialog.append(html);

                this.model.on('plugin:plugin_installed', function() {
                    jQuery(document).trigger('close.facebox');
                    jQuery('#plugin_download').remove();
                });

                dialog.hide();
                jQuery('body').append(dialog);
                jQuery.facebox({ div: '#plugin_download' });
            }, this);
        }
    });

    this.PluginManager = Backbone.Model.extend({
        soshare_props: {
            latest_version: '4.4.1',
            mime_type: 'application/x-gyre-soshare',
            activex_progid: 'gyre.soshare',
            windows_download_url: 'https://torque.bittorrent.com/SoShare.msi',
            osx_download_url: 'https://torque.bittorrent.com/SoShare.pkg'
        },
        torque_props: {
            latest_version: '4.3.8',
            mime_type: 'application/x-bittorrent-torque',
            activex_progid: 'bittorrent.torque',
            windows_download_url: 'https://torque.bittorrent.com/Torque.msi',
            osx_download_url: 'https://torque.bittorrent.com/Torque.pkg'
        },
        defaults: {
            //Avoid DOM collisions by having a ridiculous id.
            pid: 'btapp_plugin_WARNING_HAVE_NOT_INITIALIZED',
            //All BitTorrent products have this number appended to their window names
            window_hash: '4823',
            product: 'Torque'
        },
        initialize: function() {
            _.bindAll(this);
            this.set('pid', 'btapp_plugin_' + Math.floor(Math.random() * 1024));
            if(this.get('product') === 'SoShare') {
                _.each(this.soshare_props, function(value, key) {
                    if(!this.has(key)) {
                        this.set(key, value);
                    }
                }, this);
            } else if(this.get('product') === 'Torque' || this.get('product') === 'uTorrent' || this.get('product') === 'BitTorrent') {
                //Everyone else can piggy back on the torque plugin
                _.each(this.torque_props, function(value, key) {
                    if(!this.has(key)) {
                        this.set(key, value);
                    }
                }, this);
            }
            var download_url = isMac() ? this.get('osx_download_url') : this.get('windows_download_url');
            this.set('download_url', download_url);
            //when we load jquery, we should defer a call to mime_type_check
            jQuery(_.bind(_.defer, this, this.mime_type_check));
        },
        disconnect: function() {
        },
        //we know nothing. we want:
        //the plugin installed
        //the plugin up to date
        //the client installed
        //the client running
        mime_type_check: function() {
            if(this.supports_mime_type()) {
                this.mime_type_check_yes();
            } else {
                this.mime_type_check_no();
            }
        },
        mime_type_check_no: function() {
            var switches = {'install':false};
            this.trigger('plugin:install_plugin', switches);
            when(this.supports_mime_type, this.mime_type_check_yes);
        },
        mime_type_check_yes: function() {
            this.trigger('plugin:plugin_installed');
            var add = add_plugin(this.get('mime_type'));
            add.then(_.bind(function() {
                this.trigger('plugin:plugin_running');
                this.plugin_up_to_date_check();
            }, this));
        },

        plugin_up_to_date_check: function() {
            if(this.plugin_up_to_date()) {
                this.plugin_up_to_date_yes();
            } else {
                this.plugin_up_to_date_no();
            }
        },
        plugin_up_to_date_yes: function() {
            this.client_installed_check();
        },
        plugin_up_to_date_no: function() {
            var updateoptions = {'update':true};
            this.trigger('plugin:update_plugin', updateoptions);
            if(updateoptions.update) {
                this.get_plugin().checkForUpdate(_.bind(this.plugin_up_to_date_yes, this));
            } else {
                this.plugin_up_to_date_yes();
            }
        },

        //the plugin is installed. good.
        client_installed_check: function() {
            if(this.client_installed()) {
                this.client_installed_check_yes();
            } else {
                this.client_installed_check_no();
            }
        },
        client_installed_check_no: function() {
            var installoptions = {'install':true};
            this.trigger('plugin:install_client', installoptions);
            if(installoptions.install) {
                this.get_plugin().downloadProgram(this.get('product'), _.bind(function(a,b,c,d,key) {
                    jQuery.jStorage.set('pairing_key', key);
                    this.trigger('plugin:downloaded_client');
                }, this));
                when(this.client_installed, this.client_running_check_yes);
            } else {
                var runningcheckoptions = {'check':false};
                this.trigger('plugin:check_for_running_client', runningcheckoptions);
                if(runningcheckoptions.check) {
                    this.client_running_check();
                }
            }
        },
        client_installed_check_yes: function() {
            this.trigger('plugin:client_installed');
            this.client_running_check();
        },

        //the client is installed. good. 
        client_running_check: function() {
            if(this.client_running()) {
                this.client_running_check_yes();
            } else {
                this.client_running_check_no();
            }
        },
        client_running_check_no: function() {
            var switches = {'run':true};
            this.trigger('plugin:run_client', switches);
            if(switches.run) {
                this.get_plugin().runProgram(this.get('product'), function() {});
            }
            when(this.client_running, this.client_running_check_yes);
        },
        client_running_check_yes: function() {
            //well i'll be...looks like we made it to the end.
            this.trigger('plugin:client_running');
        },


        // Plugin Specific Functionality
        // ---------------------------
        supports_mime_type: function() {
            if(window.location.protocol === 'chrome-extension:') {
                //if we're in a chrome extension, assume we have the mime type available
                return true;
            }
            var isIE  = (navigator.appVersion.indexOf('MSIE') !== -1) ? true : false;
            if(isIE) {
                try {
                    var tq = new ActiveXObject(this.get('activex_progid'));
                    return tq !== undefined;
                } catch (e) {
                    return false;
                }
            } else {
                navigator.plugins.refresh();
                for (var i = 0; i < navigator.plugins.length; i++) {
                    var plugin = navigator.plugins[i][0];
                    if (plugin.type === this.get('mime_type')) {
                        return true;
                    }
                }
                return false;
            }
        },
        plugin_up_to_date: function() {
            if(window.location.protocol === 'chrome-extension:') {
                //if we're in a chrome extension, there's a different update path
                return true;
            }

            var version = this.get_plugin().version;
            var version_arr = _.map(version.split('.'), function(i) { return parseInt(i, 10); });
            var required_version_arr = _.map(this.get('latest_version').split('.'), function(i) { return parseInt(i, 10); });
            for (var i=0; i<version_arr.length; i++) {
                if (version_arr[i] < required_version_arr[i]) {
                    return false;
                } else if(version_arr[i] > required_version_arr[i]) {
                    return true;
                }
            }
            return true;
        },
        get_plugin: function() {
            var plugins = jQuery('[type="' + this.get('mime_type') + '"]');
            assert(plugins.length === 1, 'cannot call get_plugin before adding the plugin');
            return plugins[0];
        },
        plugin_loaded: function() {
            assert(this.supports_mime_type(), 'you have not installed the plugin yet');
            assert(jQuery('#' + this.get('pid')).length !== 0, 'you have not yet added the plugin');
            return this.get_plugin().version;
        },

        // Client Specific Functionality
        // ---------------------------
        // Lets ask the plugin if the specific client is running.
        get_window_name: function(product) {
            if (product === 'uTorrent') {
                return 'Torrent4823';
            } else {
                return product;
            }
        },
        client_running: function() {
            var ret = this.get_plugin().isRunning(this.get_window_name(this.get('product')));
            if(typeof ret === 'object') {
                return ret && ret.length > 0;
            } else {
                return ret;
            }
        },
        client_installed: function() {
            var version = this.get_plugin().getInstallVersion(this.get('product'));
            var not_supported = 'This application is not supported.';
            assert(version !== not_supported, not_supported);
            return version;
        }
    });
}).call(this);