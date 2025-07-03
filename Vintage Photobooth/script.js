document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const uploadBtn = document.getElementById('uploadBtn');
  const uploadContainer = document.getElementById('uploadContainer');
  const uploadBox1 = document.getElementById('uploadBox1');
  const uploadBox2 = document.getElementById('uploadBox2');
  const uploadBox3 = document.getElementById('uploadBox3');
  const uploadInputs = document.querySelectorAll('.upload-input');
  const uploadContinueBtn = document.getElementById('uploadContinueBtn');
  const uploadCancelBtn = document.getElementById('uploadCancelBtn');
  const previewFrame = document.getElementById('previewFrame');
  const previewImage = document.getElementById('previewImage');
  const downloadBtn = document.getElementById('downloadBtn');
  const newPhotoBtn = document.getElementById('newPhotoBtn');
  const aboutBtn = document.getElementById('aboutBtn');
  const aboutSection = document.getElementById('aboutSection');
  const closeAboutBtn = document.getElementById('closeAboutBtn');
  const customizeContainer = document.getElementById('customizeContainer');
  const photostripStyle = document.getElementById('photostripStyle');
  const backgroundStyle = document.getElementById('backgroundStyle');
  const dateStampCheckbox = document.getElementById('dateStampCheckbox');
  const generateBtn = document.getElementById('generateBtn');
  const photostripFrame = document.getElementById('photostripFrame');
  const printContainer = document.getElementById('printContainer');
  const printDate = document.getElementById('printDate');
  const collectBtn = document.getElementById('collectBtn');

  // Variables
  let selectedPhotos = [];
  
  // Event Listeners
  uploadBtn.addEventListener('click', showUploadInterface);
  aboutBtn.addEventListener('click', showAbout);
  closeAboutBtn.addEventListener('click', hideAbout);
  
  // Upload event listeners
  uploadBox1.addEventListener('click', () => uploadInputs[0].click());
  uploadBox2.addEventListener('click', () => uploadInputs[1].click());
  uploadBox3.addEventListener('click', () => uploadInputs[2].click());
  uploadInputs.forEach((input, index) => {
    input.addEventListener('change', (event) => handleUploadSelection(event, index));
  });
  uploadCancelBtn.addEventListener('click', cancelUpload);
  uploadContinueBtn.addEventListener('click', continueUpload);
  
  // Customization event listeners
  photostripStyle.addEventListener('change', updatePhotostripStyle);
  backgroundStyle.addEventListener('change', updateBackgroundStyle);
  dateStampCheckbox.addEventListener('change', toggleDateStamp);
  generateBtn.addEventListener('click', generatePhotostrip);
  
  collectBtn.addEventListener('click', function() {
    printContainer.classList.remove('visible');
    setTimeout(() => {
      printContainer.classList.add('hidden');
      // Reset to main screen
      uploadContainer.classList.add('hidden');
      previewFrame.classList.add('hidden');
      customizeContainer.classList.add('hidden');
    }, 300);
  });

  // Upload Functions
  function showUploadInterface() {
    uploadContainer.classList.remove('hidden');
    setTimeout(() => {
      uploadContainer.classList.add('visible');
    }, 10);
    previewFrame.classList.add('hidden');
    customizeContainer.classList.add('hidden');
  }

  function handleUploadSelection(event, index) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const box = [uploadBox1, uploadBox2, uploadBox3][index];
        box.classList.add('has-image');
        
        let img = box.querySelector('img');
        if (!img) {
          img = document.createElement('img');
          box.appendChild(img);
        }
        img.src = e.target.result;
        
        selectedPhotos[index] = {
          file: file,
          url: e.target.result
        };
        
        updateContinueButton();
      };
      reader.readAsDataURL(file);
    }
  }

  function updateContinueButton() {
    const count = selectedPhotos.filter(photo => photo).length;
    uploadContinueBtn.textContent = `Continue with ${count} photo${count !== 1 ? 's' : ''}`;
    uploadContinueBtn.disabled = count === 0;
  }

  function cancelUpload() {
    uploadContainer.classList.remove('visible');
    setTimeout(() => {
      uploadContainer.classList.add('hidden');
      resetUploadInterface();
    }, 300);
  }

  function continueUpload() {
    const photosToUse = selectedPhotos.filter(photo => photo);
    
    if (photosToUse.length > 0) {
      uploadContainer.classList.remove('visible');
      
      setTimeout(() => {
        uploadContainer.classList.add('hidden');
        showCustomizeScreen(photosToUse);
        resetUploadInterface();
      }, 300);
    } else {
      alert('Please select at least one photo to continue');
    }
  }

  function resetUploadInterface() {
    selectedPhotos = [];
    [uploadBox1, uploadBox2, uploadBox3].forEach(box => {
      box.classList.remove('has-image');
      const img = box.querySelector('img');
      if (img) img.remove();
    });
    uploadInputs.forEach(input => input.value = '');
    uploadContinueBtn.textContent = 'Continue with 0 photos';
    uploadContinueBtn.disabled = true;
  }

  // Customization Functions
  function showCustomizeScreen(photos) {
    customizeContainer.classList.remove('hidden');
    photostripFrame.innerHTML = '';
    
    const today = new Date();
    const dateString = today.toLocaleDateString();
    
    photos.forEach((photo, index) => {
      if (photo) {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'photostrip-photo';
        
        const img = document.createElement('img');
        img.src = photo.url;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        
        if (dateStampCheckbox.checked && index === photos.length - 1) {
          const stamp = document.createElement('div');
          stamp.className = 'date-stamp';
          stamp.textContent = dateString;
          photoDiv.appendChild(stamp);
        }
        
        photoDiv.appendChild(img);
        photostripFrame.appendChild(photoDiv);
      }
    });
    
    setTimeout(() => {
      customizeContainer.classList.add('visible');
    }, 10);
  }

  function updatePhotostripStyle() {
    const style = photostripStyle.value;
    photostripFrame.className = 'photostrip-frame';
    
    if (style === 'vintage') {
      photostripFrame.style.borderColor = '#6A452c';
    } else if (style === 'modern') {
      photostripFrame.style.borderColor = '#A48374';
    } else {
      photostripFrame.style.borderColor = '#161616';
    }
  }

  function updateBackgroundStyle() {
    const style = backgroundStyle.value;
    photostripFrame.style.backgroundColor = style;
  }

  function toggleDateStamp() {
    const lastPhoto = photostripFrame.lastElementChild;
    if (!lastPhoto) return;

    let stamp = lastPhoto.querySelector('.date-stamp');
    const today = new Date();

    if (dateStampCheckbox.checked) {
      if (!stamp) {
        stamp = document.createElement('div');
        stamp.className = 'date-stamp';
        stamp.textContent = today.toLocaleDateString();
        lastPhoto.appendChild(stamp);
      }
    } else {
      if (stamp) {
        stamp.remove();
      }
    }
  }

  // Fixed generatePhotostrip function
  function generatePhotostrip() {
    // First hide the customize container
    customizeContainer.classList.remove('visible');
    
    setTimeout(() => {
      customizeContainer.classList.add('hidden');
      
      // Set current date
      const today = new Date();
      printDate.textContent = today.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      
      // Capture the photostrip
      html2canvas(photostripFrame).then(canvas => {
        const finalStrip = document.getElementById('finalPhotostrip');
        finalStrip.innerHTML = '';
        
        // Style the canvas
        canvas.style.maxWidth = '100%';
        canvas.style.border = '15px solid #5e3b1e';
        canvas.style.borderRadius = '5px';
        canvas.style.margin = '20px 0';
        
        finalStrip.appendChild(canvas);
        
        // Show print container
        printContainer.classList.remove('hidden');
        setTimeout(() => {
          printContainer.classList.add('visible');
        }, 10);
      }).catch(err => {
        console.error("Error generating photostrip:", err);
        alert("Couldn't generate the photostrip. Please try again.");
      });
    }, 300);
  }

  // Preview Functions
  function downloadPhoto() {
    const link = document.createElement('a');
    link.download = 'vintage-photobooth-' + new Date().getTime() + '.png';
    link.href = previewImage.src;
    link.click();
  }

  function newPhoto() {
    previewFrame.classList.add('hidden');
  }

  // About Section Functions
  function showAbout() {
    aboutSection.classList.remove('hidden');
    setTimeout(() => {
      aboutSection.classList.add('visible');
    }, 10);
  }

  function hideAbout() {
    aboutSection.classList.remove('visible');
    setTimeout(() => {
      aboutSection.classList.add('hidden');
    }, 300);
  }
});