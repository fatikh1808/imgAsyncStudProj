const fetch = require("node-fetch");

const acceptedFiles = [
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
]

const urlMaker = (file) => {
    window.URL.createObjectURL = jest.fn();
    return URL.createObjectURL(file)
}

const workerFunc = async (array) => {
    let images = [];

    const promises = array.map(async el => {
        await fetch(el, {
            mode: 'no-cors'
        })
            .then((response) => response.blob())
            .then((blob) => {
                images.push({
                    imageURL: urlMaker(blob),
                    blob: blob
                })
            })
            .catch(error => jest.fn(error))
        
    })
    await Promise.all(promises);
    return images;

}

it('works with async/await and resolves', () => {
    return workerFunc(acceptedFiles).then(data => Promise.resolve(data)).then(resolve => {
    expect(resolve).not.toEqual([]);
    });
});

