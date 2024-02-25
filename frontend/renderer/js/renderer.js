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

function getDirectory() {
    let files = document.getElementById("filepicker").files;
    let fullDirectory = files[0].path;
    // console.log(fullDirectory);
    // fullDirectory = fullDirectory.replace(/"\\"/g, "/");
    // console.log(fullDirectory);
    // //let relativeDirectory = fullDirectory.substring(0, fullDirectory.lastIndexOf("\\"));
    // let relativeDirectory = files[0].webkitRelativePath;
    // console.log(relativeDirectory);
    // directory = fullDirectory.replace(relativeDirectory, "");
    // console.log(directory);
    // return directory;
    let relativeDirectory = files[0].webkitRelativePath;
    let relativeDirectories = relativeDirectory.split("/");
    directories = fullDirectory.split("\\");
    // console.log(directories);
    // console.log("Hello World");
    // console.log(relativeDirectories[0]);
    while (directories[directories.length - 1] != [relativeDirectories[0]]) {
        directories.pop();
    }
    // console.log(directories);
    let finalDirectory = directories.join("/");
    // console.log(finalDirectory);
    return finalDirectory;
}
