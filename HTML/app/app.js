new Ext.Application({
    launch: function () {
        var timeToolbar = new Ext.Toolbar();

        var radio = new NKInternetPlayer();
        radio.forceDecoderFormat("aac");

        var radioToolbar = new Ext.Toolbar({title:'Soma FM'});

        var tabPanel = new Ext.TabPanel({
            fullscreen: true,
            dockedItems: [{
                xtype: 'toolbar',
                title: 'HelloNK'
            }],
            tabBar: {
                ui:'light'
            },
            items: [{
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

    }
});