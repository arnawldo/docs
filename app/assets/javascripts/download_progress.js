function setDownloadHandler() {
    $('.download-button').click(function (e) {
        e.preventDefault();
        // get download button and data attributes
        const downloadButton = event.target;
        const downloadLink = downloadButton.dataset.downloadLink;
        const elementId = downloadButton.dataset.elementId;
        const elementTitle = downloadButton.dataset.elementTitle;
        const progressBorder = $(`#my-progress-${elementId}`);
        const progressBar = $(`#my-bar-${elementId}`);



        // console.log(downloadButton);
        // console.log(downloadLink);
        // console.log(elementId);

        // This will hold the the file as a local object URL
        let _OBJECT_URL;

        // Call an AJAX

        downloadButton.addEventListener('click', function () {
            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', function (e) {
                if (request.readyState === 2 && request.status === 200) {
                    // Download is being started

                    // Disable download button
                    downloadButton.disabled = true;

                    // Show progress
                    progressBorder.show()
                } else if (request.readyState == 3) {
                    // Download is under progress
                } else if (request.readyState == 4) {
                    // Downloaing has finished

                    _OBJECT_URL = URL.createObjectURL(request.response);


                    // Set href as a local object URL
                    document.querySelector(`#save-file-${elementId}`).setAttribute('href', _OBJECT_URL);

                    // Set name of download
                    document.querySelector(`#save-file-${elementId}`).setAttribute('download', elementTitle);

                    // Make save file visible
                    document.querySelector(`#save-file-${elementId}`).setAttribute("style", "display: inline-block");


                    // Recommended : Revoke the object URL after some time to free up resources
                    // There is no way to find out whether user finished downloading
                    setTimeout(function () {
                        window.URL.revokeObjectURL(_OBJECT_URL);
                    }, 60 * 1000);
                }
            });

            request.addEventListener('progress', function (e) {
                const percent_complete = (e.loaded / e.total) * 100;
                progressBar.animate({width: `${percent_complete}%`});
                console.log(percent_complete);
            });

            request.responseType = 'blob';

            // Downloading a JPEG file
            request.open('get', downloadLink);

            request.send();
        });
    })
}

// A $( document ).ready() block.
$(document).ready(function () {
    console.log("ready!");
    setDownloadHandler()
});
