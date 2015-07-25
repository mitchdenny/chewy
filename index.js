var util = require('util');

var Command = function(verb, noun, itemProcessor) {
  var self = this;
  self.itemProcessor = itemProcessor;

  self.public = {
    verb: verb,
    noun: noun
  };

  return self.public;
};

var Extension = function(module) {
  var self = this;
  self.module = module;

  self.public = {
      commands: {},
      addCommand: function(verb, noun, itemProcessor) {
        var command = new Command(verb, noun, itemProcessor);
        var commandText = util.format('%s-%s', verb, noun);
        self.public.commands[commandText] = command;
        return command;
      }
  };

  return self.public;
};

var Chewy = function() {
  var self = this;

  self.public = {
    extensions: [],
    extend: function(module) {
      var extension = new Extension(module);
      self.public.extensions.push(extension);
      return extension;
    }
  };

  return self.public;
};

var chewy = new Chewy();
var extension = chewy.extend(chewy);

var getCommandCommand = extension.addCommand('get', 'command', function(context, item) {
  context.writeItem(item);
});

var importPackageCommand = extension.addCommand('import', 'package', function(context, item) {
  context.writeItem(item);
});

module.exports = chewy;
