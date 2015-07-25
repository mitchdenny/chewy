var Context = function() {
  var self = this;

  return {
    writeItem: function(item) {

    }
  };
};

var Command = function(verb, noun, itemProcessor) {
  var self = this;
  self.verb = verb;
  self.noun = noun;
  self.itemProcessor = itemProcessor;

  return {
    process: function(context, item) {
      self.itemProcessor(context, item);
    }
  };
};

var Extension = function(module) {
  var self = this;
  self.commands = [];

  return {
    addCommand: function(verb, noun, itemProcessor) {
      var command = new Command(verb, noun, itemProcessor);
      self.commands.push(command);
      return command;
    },
    getCommands: function() {
      return self.commands;
    }
  };
};

var Chewy = function() {
  var self = this;

  return {
    extend: function(module) {
      var extension = new Extension(module);
      return extension;
    }
  };
}

var chewy = new Chewy();
var extension = chewy.extend(chewy);

extension.addCommand('get', 'command', function(context, item) {

});

module.exports = chewy;
