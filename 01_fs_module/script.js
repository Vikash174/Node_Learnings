const fs = require('fs');
// console.log(fs);



// Blocking, synchronous way
/* try {
    const data = fs.readFileSync('01_fs_module/input.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }


  const textOut = `this is the data that need to be written in file`;

  try {
    fs.writeFileSync('01_fs_module/output.txt', textOut);
    // file written successfully
  } catch (err) {
    console.error(err);
  }
 */



  // Non-Blocking, Asynchronous way
  fs.readFile('01_fs_module/input.txt','utf-8',(err,data)=>{
          console.log(data);
  });

  console.log('Will read file!');