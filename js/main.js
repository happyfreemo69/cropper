window.onload = function () {

  'use strict';

  var Cropper = window.Cropper;
  var URL = window.URL || window.webkitURL;
  var container = document.querySelector('.img-container');
  var image = container.getElementsByTagName('img').item(0);
  var download = document.getElementById('download');
  var downloadDirect = document.getElementById('downloadDirect');
  var actions = document.getElementById('actions');
  var dataX = document.getElementById('dataX');
  var dataY = document.getElementById('dataY');
  var dataHeight = document.getElementById('dataHeight');
  var dataWidth = document.getElementById('dataWidth');
  var dataRotate = document.getElementById('dataRotate');
  var dataScaleX = document.getElementById('dataScaleX');
  var dataScaleY = document.getElementById('dataScaleY');
  var downloadSize = {width:610, height:175};
  var options = {
        aspectRatio: 610 / 175,
        preview: '.img-preview',
        ready: function (e) {
          console.log(e.type);
          downloadDirect.href = cropper.getCroppedCanvas(downloadSize).toDataURL('image/png');
        },
        cropstart: function (e) {
          console.log(e.type, e.detail.action);
        },
        cropmove: function (e) {
          console.log(e.type, e.detail.action);
        },
        cropend: function (e) {
          console.log(e.type, e.detail.action);
          downloadDirect.href = cropper.getCroppedCanvas(downloadSize).toDataURL('image/png');
        },
        crop: function (e) {
          var data = e.detail;

          console.log(e.type);
          //dataX.value = Math.round(data.x);
          //dataY.value = Math.round(data.y);
          //dataHeight.value = Math.round(data.height);
          //dataWidth.value = Math.round(data.width);
          //dataRotate.value = typeof data.rotate !== 'undefined' ? data.rotate : '';
          //dataScaleX.value = typeof data.scaleX !== 'undefined' ? data.scaleX : '';
          //dataScaleY.value = typeof data.scaleY !== 'undefined' ? data.scaleY : '';
        },
        zoom: function (e) {
          console.log(e.type, e.detail.ratio);
        }
      };
  var cropper = new Cropper(image, options);
  var originalImageURL = image.src;
  var uploadedImageType = 'image/jpeg';
  var uploadedImageURL;

  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();


  // Buttons
  if (!document.createElement('canvas').getContext) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
  }

  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  }


  // Download
  if (typeof download.download === 'undefined') {
    download.className += ' disabled';
  }


  // Options
  actions.querySelector('.docs-toggles').onchange = function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var cropBoxData;
    var canvasData;
    var isCheckbox;
    var isRadio;

    if (!cropper) {
      return;
    }

    if (target.tagName.toLowerCase() === 'label') {
      target = target.querySelector('input');
    }

    isCheckbox = target.type === 'checkbox';
    isRadio = target.type === 'radio';

    if (isCheckbox || isRadio) {
      if (isCheckbox) {
        options[target.name] = target.checked;
        cropBoxData = cropper.getCropBoxData();
        canvasData = cropper.getCanvasData();

        options.ready = function () {
          console.log('ready');
          cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
        };
      } else {
        options[target.name] = target.value;
        if(target.name == "aspectRatio" && target.value=="1"){
          console.log('round');
          if(document.getElementById('styleRound') == null) {
            var style = document.createElement('style');
            style.setAttribute('id','styleRound');
            style.type = 'text/css';
            style.innerHTML = '.cropper-view-box,.cropper-face {border-radius: 50%;}';
            document.getElementsByTagName('head')[0].appendChild(style);
          }

          document.getElementById('appView').setAttribute('src','images/DRAWER_V2.1.png');
          document.getElementById('preview-appView').remove();
          var preview = document.createElement('div');
          preview.setAttribute('id', 'preview-appView');
          preview.setAttribute('class','img-preview preview-drawer');
          var previews = document.getElementById('previews');
          previews.insertBefore(preview, previews.firstChild);

          var showCanvas = document.getElementById("showCanvas");
          showCanvas.setAttribute('data-option','{ "width": 52, "height": 52 }');
          showCanvas.childNodes[1].textContent = "52x52";
          downloadSize.width = 52;
          downloadSize.height = 52;

        } else if(target.name == "aspectRatio"){
          document.getElementById("styleRound").remove();
          document.getElementById('appView').setAttribute('src','images/FICHE_IMMEUBLE.png');

          document.getElementById('preview-appView').remove();
          var preview = document.createElement('div');
          preview.setAttribute('id', 'preview-appView');
          preview.setAttribute('class','img-preview preview-immeuble');
          var previews = document.getElementById('previews');
          previews.insertBefore(preview, previews.firstChild);

          var showCanvas = document.getElementById("showCanvas");
          showCanvas.setAttribute('data-option','{ "width": 610, "height": 175 }');
          showCanvas.childNodes[1].textContent = "610x175";
          downloadSize.width = 610;
          downloadSize.height = 175;
        }
        options.ready = function () {
          console.log('ready');
          downloadDirect.href = cropper.getCroppedCanvas(downloadSize).toDataURL('image/png');
        };
      }

      // Restart
      cropper.destroy();
      cropper = new Cropper(image, options);
    }
  };


  // Methods
  actions.querySelector('.docs-buttons').onclick = function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var result;
    var input;
    var data;

    if (!cropper) {
      return;
    }

    while (target !== this) {
      if (target.getAttribute('data-method')) {
        break;
      }

      target = target.parentNode;
    }

    if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
      return;
    }

    data = {
      method: target.getAttribute('data-method'),
      target: target.getAttribute('data-target'),
      option: target.getAttribute('data-option'),
      secondOption: target.getAttribute('data-second-option')
    };

    if (data.method) {
      if (typeof data.target !== 'undefined') {
        input = document.querySelector(data.target);

        if (!target.hasAttribute('data-option') && data.target && input) {
          try {
            data.option = JSON.parse(input.value);
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      switch (data.method) {
        case 'rotate':
          cropper.clear();
          break;

        case 'getCroppedCanvas':
          try {
            data.option = JSON.parse(data.option);
          } catch (e) {
            console.log(e.message);
          }

          if (uploadedImageType === 'image/jpeg') {
            if (!data.option) {
              data.option = {};
            }

            data.option.fillColor = '#fff';
          }

          break;
      }

      result = cropper[data.method](data.option, data.secondOption);

      switch (data.method) {
        case 'rotate':
          cropper.crop();
          break;

        case 'scaleX':
        case 'scaleY':
          target.setAttribute('data-option', -data.option);
          break;

        case 'getCroppedCanvas':
          if (result) {
            // Bootstrap's Modal
            $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

            if (!download.disabled) {
              download.href = result.toDataURL(uploadedImageType);
            }
          }

          break;

        case 'destroy':
          cropper = null;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = '';
            image.src = originalImageURL;
          }

          break;
      }

      if (typeof result === 'object' && result !== cropper && input) {
        try {
          input.value = JSON.stringify(result);
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  };

  document.body.onkeydown = function (event) {
    var e = event || window.event;

    if (!cropper || this.scrollTop > 300) {
      return;
    }

    switch (e.keyCode) {
      case 37:
        e.preventDefault();
        cropper.move(-1, 0);
        break;

      case 38:
        e.preventDefault();
        cropper.move(0, -1);
        break;

      case 39:
        e.preventDefault();
        cropper.move(1, 0);
        break;

      case 40:
        e.preventDefault();
        cropper.move(0, 1);
        break;
    }
  };


  // Import image
  var inputImage = document.getElementById('inputImage');

  if (URL) {
    inputImage.onchange = function () {
      var files = this.files;
      var file;

      if (cropper && files && files.length) {
        file = files[0];

        if (/^image\/\w+/.test(file.type)) {
          uploadedImageType = file.type;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          image.src = uploadedImageURL = URL.createObjectURL(file);
          cropper.destroy();
          cropper = new Cropper(image, options);
          inputImage.value = null;
        } else {
          window.alert('Please choose an image file.');
        }
      }
    };
  } else {
    inputImage.disabled = true;
    inputImage.parentNode.className += ' disabled';
  }
};
