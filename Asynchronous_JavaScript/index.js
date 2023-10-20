const { rejects } = require('assert');
const { error } = require('console');
const fs = require('fs');
const { resolve } = require('path');
const superAgent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject('Error while reading the file');
      }

      resolve(data);
    });
  });
};

const writeFilePro = (file, writableData) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, writableData, (err) => {
      if (err) reject('Error while writing to the file');

      resolve('Sucessfully Written the data');
    });
  });
};

/* readFilePro(`${__dirname}/dog.txt`)
  .then(async (data) => {
  
      const res = await superAgent.get(
        `https://dog.ceo/api/breed/${data}/images/random`
      );
      return writeFilePro('Asynchronous_JavaScript/dog-img.txt', res.body.message);
       
   
  })
  .catch((err) => {
    console.log(err);
  });
 */
/* readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log();
    return superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    writeFilePro('Asynchronous_JavaScript/dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('file saved sucessfully');
  })
  .catch((err) => {
    console.log(err.message);
  });
 */

const getDogImg = async () => {
  const data = await readFilePro(`${__dirname}/dog.txt`);
  const jsonData = await superAgent.get(
    `https://dog.ceo/api/breed/${data}/images/random`
  );
  console.log(jsonData);

  writeFilePro('Asynchronous_JavaScript/dog-img.txt', jsonData.body.message);
};

getDogImg();
