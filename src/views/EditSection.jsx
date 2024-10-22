import { useState, useEffect } from 'react';
import { db } from '../Firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
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

  const handleAddOption = () => {
    setOptions([...options, { text: '', image: null }]);
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
        newSections[newSectionNumber || selectedSection] = {
          title: sectionTitle,
          description: sectionDescription,
          options: options
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
    <div>
      <h1>Edit Section</h1>
      <div>
        <label>Select Section:</label>
        <select value={selectedSection} onChange={handleSelectChange}>
          <option value="">Select a section</option>
          {Object.keys(sections).sort().map(section => (
            <option key={section} value={section}>{section}</option>
          ))}
        </select>
      </div>
      {selectedSection && (
        <form onSubmit={handleEditSection}>
          <div>
            <label>New Section Number:</label>
            <input
              type="text"
              value={newSectionNumber}
              onChange={(e) => setNewSectionNumber(e.target.value)}
            />
          </div>
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
          <button type="submit">Edit Section</button>
        </form>
      )}
      <button onClick={handleDeleteSection}>Delete Section</button>
    </div>
  );
}

export default EditSection;