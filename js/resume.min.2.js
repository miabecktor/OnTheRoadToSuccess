$(function() {

    var maxPercentLocalUpload = 100;

    var idOf = function(prefix,file) {
        return (prefix+file.name).replace(/[. ]/g,'');
    }

    // FireReader event handlers
    var fr = (function() {
        return {
            loadStart: function(file) {
                return function(e) {
                    console.log("loadStart: "+e);

                    var uploading = $("<div></div>");
                    uploading.addClass("thumbnail");
                    uploading.append('<span>'+file.name+'</span><br /><img id="'+idOf('img',file)+'" src=""><br /><progress id="'+idOf('pg',file)+'" value="0" max="100"></progress>');
                    $('#upload-status').append(uploading);
                };
            },
            progress: function(file) {
                return function(e) {
                    console.log("progress");

                    var progressBar = $('#'+idOf('pg',file));

                    if (e.lengthComputable) {
                        var loaded = (e.loaded / e.total);
                        console.log(e.loaded + '/' + e.total + '/' + loaded);
                        if (loaded < 1) {
                            progressBar.val(loaded * maxPercentLocalUpload);
                        }
                    } else {
                        console.log("not lengthComputable");
                        progressBar.val(maxPercentLocalUpload);
                    }
                }
            },
            load: function(file) {
                return function(e) {
                    console.log("load");

                    var progressBar = $('#'+idOf('pg',file));
                    progressBar.val(maxPercentLocalUpload);

                    // show thumbnail
                    var img = $('#'+idOf('img',file));
                    img.attr('src',e.target.result);

                    // store to local storage
                    localStorage[idOf('ls',file)] = JSON.stringify({
                        file: file,
                        data: e.target.result
                    });
                    updateImagesLocal();

                }
            },
        };
    })();

    var handleDragOver = function(evt) {
        console.log(">>handleDragOver");
        evt.stopPropagation();
        evt.preventDefault();
    };
    var handleDrop = function(evt) {
        console.log(">>handleDrop");
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files;
        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) {
                console.log(f.name+' is not image: '+f.type );
                alert("must be JPEG. your upload is "+f.type);
                continue;
            }

            var reader = new FileReader();
            reader.onloadstart = fr.loadStart(f);
            reader.onprogress  = fr.progress(f);
            reader.onload      = fr.load(f);
            reader.readAsDataURL(f);
        }

    };

    var dropArea = document.getElementById("drop-area");
    dropArea.addEventListener('dragover', handleDragOver, false);
    dropArea.addEventListener('drop',     handleDrop, false);

    var updateImagesLocal = function() {
        $('#images-local-container').html("");
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            console.log("key: "+key);
            if (key.indexOf("ls") !== 0)
                continue;
            var val = localStorage[key];
            if (val) {
                val = JSON.parse(val);
                var file = val.file;

                var image = $("<div></div>");
                image.addClass("thumbnail");
                image.append('<span>'+file.name+'</span><br /><img id="'+idOf('img',file)+'" src="'+val.data+'">');
                $('#images-local-container').append(image);
            } else {
                console.log("no in localStorage: "+key);
            }
        }
    };
    updateImagesLocal();

});
