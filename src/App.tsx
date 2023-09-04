import React, {useState} from 'react';
import './App.css';

/**
 * Represents the possible gender values.
 *
 * @typedef {('M' | 'F' | 'Other')} GenderProps
 * @description
 * Use this type to define the gender of a person. It can be one of the following values:
 * - 'M': Male
 * - 'F': Female
 * - 'Other': Other or unspecified gender
 *
 * @example
 * // Usage example:
 * const userGender: GenderProps = 'M';
 */
type GenderProps = 'M' | 'F' | 'Other';

function App() {
    /* These lines of code are initializing state variables using the `useState` hook in React. */
    const [age, setAge] = useState<number | null>(null);
    const [gender, setGender] = useState<GenderProps | ''>('');
    const [hasLicense, setHasLicense] = useState<string | null>(null);
    const [isFirstCar, setIsFirstCar] = useState<string | null>(null);
    const [surveyComplete, setSurveyComplete] = useState<boolean>(false);

    // State variables for question visibility
    const [showSecondQuestion, setShowSecondQuestion] = useState<boolean>(false);
    const [showThirdQuestion, setShowThirdQuestion] = useState<boolean>(false);

    /**
     * Handles form submission.
     *
     * @param {React.FormEvent} e - The form submission event.
     * @returns {void}
     * @description
     * This function is responsible for handling form submission. It performs validation based on user input and displays
     * appropriate alerts or updates the survey completion status accordingly.
     *
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (age !== null && age < 18) {
            alert('Thank you for your interest, but you are under 18.');
        } else if (hasLicense === 'No') {
            alert('Thank you for your interest, but you prefer using other transport.');
        } else if (age !== null && age >= 18 && age <= 25 && isFirstCar === 'Yes') {
            alert('We are targeting more experienced clients. Thank you for your interest.');
        } else {
            setShowSecondQuestion(true);
            // alert('Thank you for completing the survey!');
            // setSurveyComplete(true);
        }
    };


    /**
     * Handles changes in the age input field.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event of the age input field.
     * @returns {void}
     * @description
     * This function is responsible for handling changes in the age input field. It parses the input value, checks if it's a valid
     * integer, and updates the age state accordingly if a valid value is provided.
     *
     */
    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ageValue = parseInt(e.target.value);
        if (!isNaN(ageValue)) {
            setAge(age);
        }
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;

        if (selectedValue === 'M' || selectedValue === 'F' || selectedValue === 'Other') {
            setGender(selectedValue as GenderProps);
        } else {
            // Handle the case where the selected value is not one of the specified values.
            console.error('Invalid gender selected:', selectedValue);
        }
    };

    return (
        <div className="App">
            <h1>Car Sales Survey</h1>
            {!surveyComplete && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        value={age?.valueOf()}
                        onChange={handleAgeChange}
                        required
                        min="0"
                        max="100"
                    />
                    <br/>

                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={handleGenderChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <br/>

                    <label htmlFor="license">Do you own a car driving license?</label>
                    <input
                        type="radio"
                        id="yes-license"
                        name="license"
                        value="Yes"
                        checked={hasLicense === 'Yes'}
                        onChange={() => setHasLicense('Yes')}
                        required
                    />
                    <label htmlFor="yes-license">Yes</label>
                    <input
                        type="radio"
                        id="no-license"
                        name="license"
                        value="No"
                        checked={hasLicense === 'No'}
                        onChange={() => setHasLicense('No')}
                        required
                    />
                    <label htmlFor="no-license">No, I prefer using other transport</label>
                    <br/>

                    {/* Bonus question for users aged 18-25 */}
                    {age !== null && age >= 18 && age <= 25 && (
                        <div>
                            <label htmlFor="first-car">Is this your first car?</label>
                            <input
                                type="radio"
                                id="yes-first-car"
                                name="first-car"
                                value="Yes"
                                checked={isFirstCar === 'Yes'}
                                onChange={() => setIsFirstCar('Yes')}
                            />
                            <label htmlFor="yes-first-car">Yes</label>
                            <input
                                type="radio"
                                id="no-first-car"
                                name="first-car"
                                value="No"
                                checked={isFirstCar === 'No'}
                                onChange={() => setIsFirstCar('No')}
                            />
                            <label htmlFor="no-first-car">No</label>
                        </div>
                    )}

                    <button type="submit">Submit</button>
                </form>
            )}

            {surveyComplete && (
                <div>
                    <p>Thank you for completing the survey!</p>
                </div>
            )}
        </div>
    );
}

export default App;
