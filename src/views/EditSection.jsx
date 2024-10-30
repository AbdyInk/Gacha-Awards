import { useState, useEffect } from 'react';
import { db, storage } from '../Firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function EditSection() {
  const [sections, setSections] = useState({});
  const [selectedSection, setSelectedSection] = useState('');
  const [newSectionNumber, setNewSectionNumber] = useState('');
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionDescription, setSectionDescription] = useState('');
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      const formDoc = await getDoc(doc(db, 'formulario', 'form1'));
      if (formDoc.exists()) {
        setSections(formDoc.data().sections);
      } else {
        console.error('Form not found');
      }
    } catch (error) {
      console.error('Error loading sections:', error);
    }
  };

  const handleSelectChange = (e) => {
    const sectionNumber = e.target.value;
    setSelectedSection(sectionNumber);
    const section = sections[sectionNumber];
    setSectionTitle(section.title);
    setSectionDescription(section.description);
    setOptions(section.options);
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

  const handleAddOption = () => {
    setOptions([...options, { text: '', image: null, arroba: '', imageType: 'Avatar', description: '', urlEmbed: '' }]);
  };

  const handleDeleteSection = async () => {
    if (!selectedSection) {
      alert('Please select a section to delete.');
      return;
    }

    try {
      const formRef = doc(db, 'formulario', 'form1');
      const formDoc = await getDoc(formRef);
      if (formDoc.exists()) {
        const formData = formDoc.data();
        delete formData.sections[selectedSection];
        await updateDoc(formRef, { sections: formData.sections });
        alert('Section deleted successfully!');
        navigate('/voting');
      } else {
        console.error('Form not found');
      }
    } catch (error) {
      console.error('Error deleting section:', error);
      alert('Failed to delete section.');
    }
  };

  const handleEditSection = async (e) => {
    e.preventDefault();
    if (!selectedSection) {
      alert('Please select a section to edit.');
      return;
    }

    try {
      const formRef = doc(db, 'formulario', 'form1');
      const formDoc = await getDoc(formRef);
      if (formDoc.exists()) {
        const formData = formDoc.data();
        const newSections = { ...formData.sections };

        // Handle section number change
        if (newSectionNumber && newSectionNumber !== selectedSection) {
          if (newSections[newSectionNumber]) {
            // Swap sections if the new section number already exists
            const temp = newSections[newSectionNumber];
            newSections[newSectionNumber] = newSections[selectedSection];
            newSections[selectedSection] = temp;
          } else {
            // Move section to new number
            newSections[newSectionNumber] = newSections[selectedSection];
            delete newSections[selectedSection];
          }
        }

        // Update section details
        const optionsWithUrls = await Promise.all(options.map(async (option, index) => {
          if (option.image) {
            const imageRef = ref(storage, `sections/${newSectionNumber || selectedSection}/options/${index}`);
            await uploadBytes(imageRef, option.image);
            const imageUrl = await getDownloadURL(imageRef);
            return { 
              text: option.text || '', 
              imageUrl, 
              arroba: option.arroba || '', 
              imageType: option.imageType || 'Avatar', 
              description: option.description || '',
              urlEmbed: option.urlEmbed || ''
            };
          } else {
            return { 
              text: option.text || '', 
              imageUrl: option.imageUrl || null, 
              arroba: option.arroba || '', 
              imageType: option.imageType || 'Avatar', 
              description: option.description || '',
              urlEmbed: option.urlEmbed || ''
            };
          }
        }));

        newSections[newSectionNumber || selectedSection] = {
          title: sectionTitle,
          description: sectionDescription,
          options: optionsWithUrls
        };

        await updateDoc(formRef, { sections: newSections });
        alert('Section edited successfully!');
        navigate('/voting');
      } else {
        console.error('Form not found');
      }
    } catch (error) {
      console.error('Error editing section:', error);
      alert('Failed to edit section.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', overflow: 'auto', maxHeight: '80vh' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Edit Section</h1>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Select Section:</label>
        <select value={selectedSection} onChange={handleSelectChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}>
          <option value="">Select a section</option>
          {Object.keys(sections).sort().map(section => (
            <option key={section} value={section}>{section}</option>
          ))}
        </select>
      </div>
      {selectedSection && (
        <form onSubmit={handleEditSection}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>New Section Number:</label>
            <input
              type="text"
              value={newSectionNumber}
              onChange={(e) => setNewSectionNumber(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
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
                {option.imageUrl && (
                  <img src={option.imageUrl} alt="Option" style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }} />
                )}
                <input
                  type="text"
                  placeholder="Arroba"
                  value={option.arroba}
                  onChange={(e) => handleOptionChange(index, 'arroba', e.target.value)}
                  style={{ width: 'calc(100% - 110px)', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '10px' }}
                />
                <select
                  value={option.imageType}
                  onChange={(e) => handleOptionChange(index, 'imageType', e.target.value)}
                  style={{ width: 'calc(100% - 110px)', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '10px' }}
                >
                  <option value="Avatar">Avatar</option>
                  <option value="Banner">Banner</option>
                  <option value="Embed">Embed</option>
                </select>
                {option.imageType === 'Embed' && (
                  <input
                    type="text"
                    placeholder="URL Embed"
                    value={option.urlEmbed}
                    onChange={(e) => handleOptionChange(index, 'urlEmbed', e.target.value)}
                    style={{ width: 'calc(100% - 110px)', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '10px' }}
                  />
                )}
                <input
                  type="text"
                  placeholder="Descripción"
                  value={option.description}
                  onChange={(e) => handleOptionChange(index, 'description', e.target.value)}
                  style={{ width: 'calc(100% - 110px)', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '10px' }}
                />
              </div>
            ))}
            <button type="button" onClick={handleAddOption} style={{ padding: '10px 15px', borderRadius: '5px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}>Add Option</button>
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px 15px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: '#fff', cursor: 'pointer' }}>Edit Section</button>
        </form>
      )}
      <button onClick={handleDeleteSection} style={{ width: '100%', padding: '10px 15px', borderRadius: '5px', border: 'none', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer', marginTop: '10px' }}>Delete Section</button>
    </div>
  );
}

export default EditSection;