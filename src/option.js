exports.help = {
  receive: 'help',
  reply: ''
};

exports.newBios = {
  receive: 'new bios',
  reply: {
    type: 'template',
    altText: 'New BIOS alt text',
    template: {
      type: 'buttons',
      title: 'New BIOS Rom',
      text: 'Platform option',
      actions: [
        { label: 'Kabylake_WS', type: 'postback', data: 'Kabylake_WS' },
        { label: 'Kabylake_DT', type: 'postback', data: 'Kabylake_DT' },
        { label: 'Kabylake_MB', type: 'postback', data: 'Kabylake_MB' }
      ]
    }
  }
};

exports.isio = [
  {
    receive: 'Kabylake_WS',
    reply: {}
  },
  {
    receive: 'Kabylake_DT',
    reply: {}
  },
  {
    receive: 'Kabylake_MB',
    reply: {}
  }
];

/*
exports.OPTION = {
  help: {
    receive: 'help',
    reply: ''
  },
  new: {
    receive: 'new bios',
    reply: {
      type: 'template',
      altText: 'New BIOS alt text',
      template: {
        type: 'buttons',
        title: 'New BIOS Rom',
        text: 'Platform option',
        actions: [
          { label: 'Kabylake_WS', type: 'message', text: 'Kabylake_WS'},
          { label: 'Kabylake_DT', type: 'message', text: 'Kabylake_DT'},
          { label: 'Kabylake_MB', type: 'message', text: 'Kabylake_MB'}
        ]
      }
    }
  } 
};
*/