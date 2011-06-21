new Ext.Application({
    launch: function () {
        var timeToolbar = new Ext.Toolbar();
        new Ext.TabPanel({
            fullscreen: true,
            dockedItems: [{
                xtype: 'toolbar',
                title: 'HelloNK'
            }],
            tabBar: {
                ui:'light'
            },
            items: [{
                title: 'Alerts',
                dockedItems: [timeToolbar],
                layout: {type: 'vbox', align:'center'},
                items: [
                    {xtype: 'button', text: 'Alert',
                        listeners: {tap: function() {
                            alert('A regular JavaScript alert');
                        }}
                    },
                    {xtype: 'button', text: 'Confirm',
                        listeners: {tap: function() {
                            confirm('A regular JavaScript confirmation');
                        }}
                    },
                    {xtype: 'button', text: 'NKAlert', ui: 'confirm',
                        listeners: {tap: function() {
                            NKAlert('This is a...', '...NimbleKit alert');
                        }}
                    },
                    {xtype: 'button', text: 'NKConfirm', ui: 'confirm',
                        listeners: {tap: function() {
                            NKConfirm(
                                'This is a...', '...NimbleKit confirmation',
                                'It rocks!', 'I love it!',
                                'confirmCallback'
                            );
                        }}
                    },
                    {xtype: 'button', text: 'NKAlertSheet', ui: 'confirm',
                        listeners: {tap: function() {
                            var sheet = new NKAlertSheet();
                            sheet.init('confirmCallback');
                            sheet.setTitle("Like this?");
                            sheet.addButtonWithTitle("It rocks!");
                            sheet.addButtonWithTitle("I love it!");
                            sheet.addButtonWithTitle("Cancel");
                            sheet.setStyle("blacktranslucent");
                            sheet.setRedButtonIndex(2);
                            sheet.show()
                        }}
                    }
                ]
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
        
    }
});