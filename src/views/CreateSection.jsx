import { useState } from 'react';
import { db, storage } from '../Firebase/firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function CreateSection() {
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionDescription, setSectionDescription] = useState('');
  const [options, setOptions] = useState([{ text: '', image: null }]);
  const navigate = useNavigate();

  const handleAddOption = () => {
    setOptions([...options, { text: '', image: null }]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const handleImageChange = (index, file) => {
    const newOptions = [...options];
    newOptions[index].image = file;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sectionTitle || !sectionDescription || options.some(option => !option.text)) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const formRef = doc(db, 'formulario', 'form1');
      const formDoc = await getDoc(formRef);
      if (formDoc.exists()) {
        const formData = formDoc.data();
        const sectionNumber = Object.keys(formData.sections).length + 1;

        // Subir imágenes a Firebase Storage y obtener las URLs
        const optionsWithUrls = await Promise.all(options.map(async (option, index) => {
          if (option.image) {
            const imageRef = ref(storage, `sections/${sectionNumber}/options/${index}`);
            await uploadBytes(imageRef, option.image);
            const imageUrl = await getDownloadURL(imageRef);
            return { text: option.text, imageUrl };
          } else {
            return { text: option.text };
          }
        }));

        await updateDoc(formRef, {
          [`sections.${sectionNumber}`]: {
            title: sectionTitle,
            description: sectionDescription,
            options: optionsWithUrls
          }
        });
        alert('Section added successfully!');
        navigate('/voting');
      } else {
        console.error('Form not found');
      }
    } catch (error) {
      console.error('Error adding section:', error);
      alert('Failed to add section.');
    }
  };

  return (
    <div>
      <h1>Create New Section</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Section Title:</label>
          <input
            type="text"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Section Description:</label>
          <input
            type="text"
            value={sectionDescription}
            onChange={(e) => setSectionDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Options:</label>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddOption}>Add Option</button>
        </div>
        <button type="submit">Create Section</button>
      </form>
    </div>
  );
}

export default CreateSection;