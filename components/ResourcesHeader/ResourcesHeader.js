import styles from '../../styles/Resources/ResourcesHeader.module.css';

const ResourcesHeader = () => {
    return(
        <>
            <div>
                <div className={styles.header_container}>
                    <div>
                        <div className={styles.title}>
                            <div>
                                <h1
                                    className={styles.header_title}
                                    style={{
                                    color: "var(--primary-3)",
                                    }}
                                >
                                    Resources
                                </h1>
                                <h1
                                    className={styles.header_title}
                                    style={{ color: "var(--primary-4)" }}
                                >
                                    to learn
                                </h1>
                            </div>
                        </div>
                        <div className={styles.design_component}>
                            <img src='/assets/design-component-2.svg'></img>
                        </div>
                        {/* <hr className={styles.dotted_line} />
                        <br />
                        <hr className={styles.dotted_line_vertical}/> */}
                    </div>

                    <div>
                        <div className={styles.design_component}>
                            <img src='/assets/design-component-1.svg'></img>
                        </div>
                        {/* <div className={styles.design_component}>
                            <img src='/assets/design-component-2.svg'></img>
                        </div> */}
                    </div>
                    
                    {/* <div>
                        
                        <div className={styles.image_container}>
                            <div className={styles.resources_img}>
                                <img src='/assets/images/resources-blue.svg'></img>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default ResourcesHeader;