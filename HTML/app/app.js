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
        
        window.switchTab = function () {
            var currentTab = tabPanel.getActiveItem();
            tabPanel.setActiveItem((currentTab.title=='Alerts')?1:0);
            navigation.toggle();
        }
    }
});