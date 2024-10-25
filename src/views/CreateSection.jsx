import { useState } from 'react';
import { db, storage } from '../Firebase/firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function CreateSection() {
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionDescription, setSectionDescription] = useState('');
  const [options, setOptions] = useState([{ text: '', image: null, arroba: '' }]);
  const navigate = useNavigate();

  const handleAddOption = () => {
    setOptions([...options, { text: '', image: null, arroba: '' }]);
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleImageChange = (index, file) => {
    const newOptions = [...options];
    newOptions[index].image = file;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sectionTitle || !sectionDescription || options.some(option => !option.text || !option.arroba)) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const formRef = doc(db, 'formulario', 'form1');
      const formDoc = await getDoc(formRef);
      if (formDoc.exists()) {
        const formData = formDoc.data();
        const sectionNumber = Object.keys(formData.sections).length + 1;

        const optionsWithUrls = await Promise.all(options.map(async (option, index) => {
          if (option.image) {
            const imageRef = ref(storage, `sections/${sectionNumber}/options/${index}`);
            await uploadBytes(imageRef, option.image);
            const imageUrl = await getDownloadURL(imageRef);
            return { text: option.text, imageUrl, arroba: option.arroba };
          } else {
            return { text: option.text, arroba: option.arroba };
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
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', overflow: 'auto', maxHeight: '80vh' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Create New Section</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Section Title:</label>
          <input
            type="text"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Section Description:</label>
          <input
            type="text"
            value={sectionDescription}
            onChange={(e) => setSectionDescription(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Options:</label>
          {options.map((option, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                style={{ width: 'calc(100% - 110px)', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px' }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                style={{ width: '100px' }}
              />
              <input
                type="text"
                placeholder="Arroba"
                value={option.arroba}
                onChange={(e) => handleOptionChange(index, 'arroba', e.target.value)}
                style={{ width: 'calc(100% - 110px)', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '10px' }}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddOption} style={{ padding: '10px 15px', borderRadius: '5px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}>Add Option</button>
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px 15px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: '#fff', cursor: 'pointer' }}>Create Section</button>
      </form>
    </div>
  );
}

export default CreateSection;
