new Ext.Application({
    launch: function () {
        var timeToolbar = new Ext.Toolbar();

        var navigation = new NKNavigationController();
        navigation.addNavigationItem('Home', 'switchTab', 10);
        navigation.hide();
        navigation.showing = false;
        navigation.toggle = function() {
            if (navigation.showing) {
                navigation.hide();
                navigation.showing = false;
            } else {
                navigation.show();
                navigation.showing = true;
            }
        }

        var radio = new NKInternetPlayer();
        radio.forceDecoderFormat("aac");
        
        var radioToolbar = new Ext.Toolbar({title:'Soma FM'});
        
        var photoPanel = new Ext.Panel({margin:10});
        var emailButton = new Ext.Button({
            text: 'Email photo',
            disabled: true,
            listeners: {tap: function() {
                var composer = new NKMailComposer();
                composer.setRecipient("my.friend@example.com");
                composer.setSubject("A Sencha Touch photo");
                composer.setBody("It's amazing what you can do with web apps these days");
                composer.addImage(photoPanel.image);
                composer.show();
            }}
        })
        var takeButton = new Ext.Button({
            text: 'Take Photo',
            ui: 'confirm',
            listeners: {tap: function() {
                NKPickImageObject('takenPhoto', 'camera');
            }}
        });
        
        var tabPanel = new Ext.TabPanel({
            fullscreen: true,
            dockedItems: [{
                xtype: 'toolbar',
                title: 'HelloNK',
                items: [{
                    text:'Menu',
                    listeners: {tap: function () {
                        navigation.toggle();
                    }}
                }]
            }],
            tabBar: {
                ui:'light'
            },
            items: [{
                title: 'Camera',
                layout: {type: 'vbox', align:'center'},
                items: [takeButton, emailButton, photoPanel]
            }, {
                title: 'Radio',
                layout: {type: 'vbox', align:'center'},
                defaults: {xtype: 'button'},
                dockedItems: [radioToolbar],
                items: [{
                    xtype: 'sliderfield',
                    label: 'Volume',
                    value: 50,
                    minValue: 0,
                    maxValue: 100,
                    listeners: {drag: function(slider, thumb, value) {
                        radio.setVolume(value);
                    }}
                }, {
                    text: 'Play',
                    ui: 'confirm',
                    listeners: {tap: function() {
                        radio.playFromURL("http://mp1-gs130.somafm.com:80");
                    }}
                }, {
                    text: 'Stop',
                    ui: 'decline',
                    listeners: {tap: function() {
                        radio.stop();
                    }}
                }]
            }, {
                title: 'Alerts',
                dockedItems: [timeToolbar],
                layout: {type: 'vbox', align:'center'},
                defaults: {xtype: 'button'},
                items: [{
                    text: 'Alert',
                    listeners: {tap: function() {
                        alert('A regular JavaScript alert');
                    }}
                }, {
                    text: 'Confirm',
                    listeners: {tap: function() {
                        confirm('A regular JavaScript confirmation');
                    }}
                }, {
                    text: 'NKAlert',
                    ui: 'confirm',
                    listeners: {tap: function() {
                        NKAlert('This is a...', '...NimbleKit alert');
                    }}
                }, {
                    text: 'NKConfirm',
                    ui: 'confirm',
                    listeners: {tap: function() {
                        NKConfirm(
                            'This is a...', '...NimbleKit confirmation',
                            'It rocks!', 'I love it!',
                            'confirmCallback'
                        );
                    }}
                }, {
                    text: 'NKAlertSheet',
                    ui: 'confirm',
                    listeners: {tap: function() {
                        var sheet = new NKAlertSheet();
                        sheet.init('confirmCallback');
                        sheet.setTitle("Like this?");
                        sheet.addButtonWithTitle("It rocks!");
                        sheet.addButtonWithTitle("I love it!");
                        sheet.addButtonWithTitle("Cancel");
                        sheet.setStyle("blacktranslucent");
                        sheet.setRedButtonIndex(2);
                        sheet.show();
                    }}
                }]
            }, {
                title: 'Info',
                html:
                    '<table>' +
                        '<tr><th>Device</th><td>' +
                            NKGetDeviceType() +
                        '</td></tr>' +
                        '<tr><th>ID</th><td>' +
                            NKGetUniqueIdentifier() +
                        '</td></tr>' +
                        '<tr><th>Cellular</th><td>' +
                            NKIsInternetAvailableViaCellularNetwork() +
                        '</td></tr>' +
                        '<tr><th>WiFi</th><td>' +
                            NKIsInternetAvailableViaWifi() +
                        '</td></tr>' +
                    '</table>'
            }]
        });
        
        window.confirmCallback = function (index) {
            NKAlert('You clicked...', '...button #' + index);
        }
        setInterval(function () {timeToolbar.setTitle(new Date().toLocaleTimeString());}, 1000);

        setInterval(function () {
            var meta = radio.getCurrentMetaString().match(/'[^']*'/);
            if (meta) {
                radioToolbar.setTitle(meta);
            }
        }, 5000);
        
        window.switchTab = function () {
            var currentTab = tabPanel.getActiveItem();
            tabPanel.setActiveItem((currentTab.title=='Alerts')?1:0);
            navigation.toggle();
        }
        
        window.takenPhoto = function(image) {
            var dimensions = image.getSize().split(',');
            var width = 200;
            var height = width * dimensions[1] / dimensions[0];
            var base64 = image.getBase64(0.6);
            photoPanel.update(
                '<img src="data:image/jpg;base64,' + base64 + '" ' +
                ' width="' + width + '" height="' + height + '" />'
            );
            photoPanel.image = image;
            emailButton.setDisabled(false);
        }
    }
});