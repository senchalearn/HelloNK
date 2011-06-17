new Ext.Application({
    launch: function () {
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
                title: 'One'
            }, {
                title: 'Two'
            }]
        });
    }
});