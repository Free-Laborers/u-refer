import React, {useState} from 'react';

export default function DescriptionPage() {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const description = { text };
    }

    return (
        <div className = "App">
            Why would they be a good fit?<br />
            **Responses are usually 200-1500 words long<br />

            <form onSubmit = {handleSubmit}>                
                <textarea
                    required
                    value = {text}
                    onChange = {(e) => setText(e.target.value)}
                />
            </form>
        </div>
    )
  }