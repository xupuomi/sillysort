// const outputPath = document.querySelector('#output-path');
// const filename = document.querySelector('#filename');

// function loadFile(e) {
//     const file = e.target.files[0];
// }

// img.addEventListener('change', loadFile);

// document.getElementById("filepicker").addEventListener(
//     "change",
//     (event) => {
//       let output = document.getElementById("listing");
//       for (const file of event.target.files) {
//         let item = document.createElement("li");
//         item.textContent = file.webkitRelativePath;
//         output.appendChild(item);
//       }
//     },
//     false,
//   );

//write a function that will recieve the uploaded files and get their absolute paths.
function getAbsolutePaths() {
    // const files = e.target.files;
    // const filesArray = Array.from(files);
    // const absolutePaths = filesArray.map(file => file.path);
    // console.log(absolutePaths);
    // return absolutePaths;
    let filepicker = document.getElementById("filepicker");
    let absolutePaths = [];
    for (const file of filepicker.files) {
        absolutePaths.push(file.path);
    }
    console.log(absolutePaths);
    return absolutePaths;
}    