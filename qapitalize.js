'use strict';

// ---

if (require.main === module) {
  main();
}

// ---

function main() {
  require('./src/containerFactory').createContainer().resolve(function (app) {
    app.listen(3000);
		console.log("Listening on 3000");
  });
}
