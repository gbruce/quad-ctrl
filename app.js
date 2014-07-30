var Cylon = require('cylon');

Cylon.robot({
    connections: [{
        name: 'arduino',
        adaptor: 'firmata',
		    //        port: '/dev/tty.usbserial-A900N2ET'
		    port: '/dev/tty.usbserial-A800HFW6'
    }, {
        name: 'skynet',
        adaptor: 'skynet',
        uuid: "96ee6c21-ec85-11e3-995a-b7667747c514",
        token: "00a287blzbrwl8frqbdaxhhw7j9bpgb9"
    }],

    device: {
        name: 'led',
        driver: 'led',
        pin: 13,
        connection: 'arduino'
    },

    work: function(my) {
      Cylon.Logger.info('Started');

      my.skynet.on('message', function(data) {
          var message = JSON.parse(data.payload);
          Cylon.Logger.info(message);
          if(message.red == 'on') {
              Cylon.Logger.info('Turning on led');
              my.led.turnOn();
          }
          else if(message.red == 'off') {
              Cylon.Logger.info('Turning off led');
              my.led.turnOff();
          }
    });
}
}).start();
