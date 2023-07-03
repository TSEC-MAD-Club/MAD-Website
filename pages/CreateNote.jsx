import React from "react";
import Sidebar from "../components/Sidebar/SidebarComponent";
import styles from "../styles/CreateNote.module.css"
import uploadIcon from "../public/assets/images/uploadIcon.png"
import HamburgerMenu from "../components/Hamburger/HamburgerMenu";


const CreateNote = () => {
    return (
        <div style={{ background: "var(--dark-bg)" }}>
        <div className={styles.pageWrapper}>
            <Sidebar />
            
                <HamburgerMenu/>
            
             
            <div className={styles.noteWrapper}>
                <h1 className={styles.mainHeading}>Create a Note</h1>
                <h5 className={styles.subTitle}>Create a Note about something for the students</h5>
                <div className={styles.createNoteWrapper}>
                    <div className={styles.gridBox}>
                        <div className={styles.subjectDiv}>
                            <label>Subject*</label>
                            <input
                                placeholder="Enter the subject here"
                                type="text"
                                className={styles.subjectText}
                            />
                        </div>
                    </div>
                    <div className={styles.gridBox}>
                        <div className={styles.subjectDiv}>
                            <label>Select Students</label>
                            <select className={styles.subjectText}>
                                <option>Select the students</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.gridBox}>
                        <div className={styles.descriptionDiv}>
                            <label>Description*</label>
                            <textarea
                                placeholder="Enter the details here"
                                className={styles.descriptionBox}>
                            </textarea>
                        </div>
                    </div>
                        <div className={styles.gridBox}>
      <div className={styles.addNotesDiv}>
<label className={styles.label} style={{ marginBottom: '1rem' }}>
  Add Notes
</label>
                            <div className={styles.addNotesContainer}>
       <label htmlFor="file-upload">
  <div className={styles.uploadContainer}>
    <img className={styles.uploadIcon} src={uploadIcon} alt="" />
                                        <div className={styles.uploadText}>Drag and drop files or
                                        <input id="file-upload" type="file" style={{ display: 'none' }} />
                                            <span className={styles.browseText}> Browse</span></div>
                                        <div className={styles.uploadTextInstruction}>
Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
                                        </div>
  </div>
    
  
</label>
                                </div>
      </div>
    </div>
                </div>
                <div className={styles.sendNoteButtonContainer}>
                    <button type="submit" className={styles.sendNoteButton}>
                        Send Note
                    </button>
                </div>
            </div>
            </div>
            </div>
    )
}

export default CreateNote;