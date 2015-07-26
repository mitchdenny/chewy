var util = require('util');

var Argument = function(long, short, validator) {
  var self = this;
  self.validator = validator;

  self.public = {
    long: long,
    short: short
  };

  return self.public;
}

var Command = function(verb, noun, itemProcessor) {
  var self = this;
  self.itemProcessor = itemProcessor;

  self.public = {
    verb: verb,
    noun: noun,
    arguments: {},
    addArgument: function(long, short, validator) {
      var argument = new Argument(long, short, validator);
      self.public.arguments[long] = argument;
      return argument;
    }
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

  self.module.__chewy = self.public;

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

var getCommand = extension.addCommand('get', 'command', function(context, item) {
  context.writeItem(item);
});

getCommand.addArgument('package', 'p', function(argument) {
  return argument != null;
});

var importPackage = extension.addCommand('import', 'package', function(context, item) {
  context.writeItem(item);
});

importPackage.addArgument('package', 'p', function(argument) {
  return argument != null;
});

module.exports = chewy;
