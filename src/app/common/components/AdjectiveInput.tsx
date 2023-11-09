import React, { useState } from 'react';
interface AdjectiveInputProps {
    adjectives: string[];
    setAdjectives: React.Dispatch<React.SetStateAction<string[]>>;
}

/**
 * Accepts input from the user and adds them to a list of adjectives, which is displayed beneath the input.
 * @param adjectives the list of adjectives
 * @param setAdjectives function to set adjectives
 */
export default function AdjectiveInput({adjectives, setAdjectives}: AdjectiveInputProps){

    const [inputValue, setInputValue] = useState<string>('');
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
                    id="adjectives"
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
                    <ul id="adjective-list">
                        {adjectives.map((adjective, index) => (
                            <li key={index}>{adjective}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
