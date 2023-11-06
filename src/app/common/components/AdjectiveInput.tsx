import React, { useState } from 'react';

const AdjectiveInput: React.FC = () => {

    const [inputValue, setInputValue] = useState<string>('');
    const [adjectives, setAdjectives] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submit action

        const newAdjectives = inputValue.split(',')
            .map((adj) => adj.trim())
            .filter((adj) => adj !== '');

        // Legg til adjektiver i listen
        setAdjectives((prevAdjectives) => [...prevAdjectives, ...newAdjectives]);
        setInputValue('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Enter adjectives separated by commas:</h2>
                <input
                    id="adjective-input"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="quick, lazy, playful"
                /><br/>
                <button type="submit">Submit</button>
            </form>
            {adjectives.length > 0 && (
                <div>
                    <h3>Adjective list:</h3>
                    <ul>
                        {adjectives.map((adjective, index) => (
                            <li key={index}>{adjective}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdjectiveInput;
