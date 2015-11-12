module.exports = function (Test) {
  var async = require('async');
  Test.async = function (data, cb) {
    process.context['loopback'].active.accessToken = "123";
    async.series([
                   function (cb) {
                     console.log("This should work")
                     console.log(process.context);
                     cb();
                   },
                   function (cb) {
                     console.log("This should work as well, but after installing async 1.1.0 in the same time with loopback base modules")
                     console.log(process.context);
                     cb();
                   }
                 ],
                 cb
    )
  };

  Test.remoteMethod(
    'async',
    {
      returns: {arg: 'test', type: 'string'},
      http: {path: '/async', verb: 'get'},
      notes: "Removes a post"
    }
  );
};
