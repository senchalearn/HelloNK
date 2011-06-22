new Ext.Application({
    launch: function () {
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
    }
});