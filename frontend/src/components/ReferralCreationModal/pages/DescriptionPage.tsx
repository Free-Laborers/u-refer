// import React, {useState} from 'react';


interface DescriptionPageProps{
    description: string
    setDescription: (description: string) => void
}

export default function DescriptionPage(props: DescriptionPageProps) {

    const handleSubmit = (e) => {
        e.preventDefault();
        // const description = props.description;
    };

    return (
        <div className = "App">
            <div style={{paddingTop: "20px"}}>
            <div><strong>Why would they be a good fit?</strong></div>
                <form onSubmit = {handleSubmit}>                
                    <textarea rows={25} cols={64}
                    placeholder = 'Responses are usually 200-1500 words long.'
                        required
                        value = {props.description}
                        onChange = {(e) => props.setDescription(e.target.value)}
                    />
                </form>
            </div>
        </div>
    );
  }
	