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

type AlertProps = {
    showAlert: boolean;
    alertMessage: string;
}

function App() {
    /* These lines of code are initializing state variables using the `useState` hook in React. */
    const [age, setAge] = useState<number | null>(null);
    const [gender, setGender] = useState<GenderProps | ''>('');
    const [hasLicense, setHasLicense] = useState<string | null>(null);
    const [isFirstCar, setIsFirstCar] = useState<string | null>(null);
    const [drivetrainOption, setDrivetrainOption] = useState<string | null>(null);
    const [isWorriedFuelEmissions, setWorriedFuelEmissions] = useState<string | null>(null);
    const [surveyComplete, setSurveyComplete] = useState<boolean>(false);
    const [carNumber, setCarNumber] = useState<number>(0);

    const [alert, setAlert] = useState<AlertProps>({showAlert: false, alertMessage: ''});

    const [showLastQuestions, setshowLastQuestions] = useState<boolean>(false);


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
            setAlert({showAlert: true, alertMessage: 'Thank you for your interest, but you are under 18.'});
            // alert('Thank you for your interest, but you are under 18.');
        } else if (hasLicense === 'No') {
            // alert('Thank you for your interest, but you prefer using other transport.');
        } else if (age !== null && age >= 18 && age <= 25 && isFirstCar === 'Yes') {
            // alert('We are targeting more experienced clients. Thank you for your interest.');
        } else {
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
    const handleAgeBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ageValue = parseInt(e.target.value);
        if (!isNaN(ageValue)) {
            setAge(ageValue);
        }

        if (ageValue !== null && ageValue < 18) {
            setAlert({showAlert: true, alertMessage: 'Thank you for your interest, but you are under 18.'});
        }
    };

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ageValue = parseInt(e.target.value);
        if (!isNaN(ageValue)) {
            setAge(ageValue);
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

    const handleDrivingLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = e.target.value;
        setHasLicense(selectedValue);
        if (selectedValue === 'No') {
            setAlert({
                showAlert: true,
                alertMessage: 'Thank you for your interest, but you prefer using other transport'
            });
        }
    };

    const handleFirstCarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = e.target.value;
        setIsFirstCar(selectedValue);
        if (selectedValue === 'Yes') {
            setAlert({
                showAlert: true,
                alertMessage: 'We are targeting more experienced clients. Thank you for your interest.'
            });
        } else {
            setshowLastQuestions(true);
        }
    };

    const handleDrivetrainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDrivetrainOption(e.target.value);
    };

    const handleWorriedFuelEmissionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWorriedFuelEmissions(e.target.value);
    };

    const handleCarNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const carNumerValue = parseInt(e.target.value);
        setCarNumber(carNumerValue);
    };

    const handleCompleteSurvey = () => {
        // Display the custom alert when the survey is completed
        setAlert({showAlert: true, alertMessage: 'Thank you for completing the survey!'});
    };

    const handleAlertClose = () => {
        // Reload the page to original state when the "OK" button in the custom alert is clicked
        window.location.reload();
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
                        value={age !== null ? age : ''}
                        onBlur={handleAgeBlur}
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

                    {age !== null && age >= 18 && (
                        <div>
                            <label htmlFor="license">Do you own a car driving license?</label>
                            <input
                                type="radio"
                                id="yes-license"
                                name="license"
                                value="Yes"
                                checked={hasLicense === 'Yes'}
                                onChange={handleDrivingLicenseChange}
                                required
                            />
                            <label htmlFor="yes-license">Yes</label>
                            <input
                                type="radio"
                                id="no-license"
                                name="license"
                                value="No"
                                checked={hasLicense === 'No'}
                                onChange={handleDrivingLicenseChange}
                                required
                            />
                            <label htmlFor="no-license">No, I prefer using other transport</label>
                            <br/>
                        </div>
                    )}

                    {/* Bonus question for users aged 18-25 */}
                    {age !== null && age >= 18 && age <= 25 && hasLicense === 'Yes' && (
                        <div>
                            <label htmlFor="first-car">Is this your first car?</label>
                            <input
                                type="radio"
                                id="yes-first-car"
                                name="first-car"
                                value="Yes"
                                checked={isFirstCar === 'Yes'}
                                onChange={handleFirstCarChange}
                            />
                            <label htmlFor="yes-first-car">Yes</label>
                            <input
                                type="radio"
                                id="no-first-car"
                                name="first-car"
                                value="No"
                                checked={isFirstCar === 'No'}
                                onChange={handleFirstCarChange}
                            />
                            <label htmlFor="no-first-car">No</label>
                        </div>
                    )}

                    {showLastQuestions && (
                        <div>
                            <label htmlFor="drivetrain">Which drivetrain do you prefer?</label>
                            <input
                                type="radio"
                                id="fwd"
                                name="drivetrain"
                                value="FWD"
                                checked={drivetrainOption === 'FWD'}
                                onChange={handleDrivetrainChange}
                            />
                            <label htmlFor="fwd-drivetrain">FWD</label>
                            <input
                                type="radio"
                                id="rwd"
                                name="drivetrain"
                                value="RWD"
                                checked={drivetrainOption === 'RWD'}
                                onChange={handleDrivetrainChange}
                            />
                            <label htmlFor="rwd-drivetrain">RWD</label>
                            <input
                                type="radio"
                                id="idk"
                                name="drivetrain"
                                value="IDK"
                                checked={drivetrainOption === 'IDK'}
                                onChange={handleDrivetrainChange}
                            />
                            <label htmlFor="idk-drivetrain">I don’t know</label>

                            <br/>

                            <label htmlFor="fuel-emissions">Are you worried about fuel emissions?</label>
                            <input
                                type="radio"
                                id="yes-fuel-emissions"
                                name="fuel-emissions"
                                value="Yes"
                                checked={isWorriedFuelEmissions === 'Yes'}
                                onChange={handleWorriedFuelEmissionsChange}
                            />
                            <label htmlFor="yes-fuel-emissions">Yes</label>
                            <input
                                type="radio"
                                id="no-fuel-emissions"
                                name="fuel-emissions"
                                value="No"
                                checked={isWorriedFuelEmissions === 'No'}
                                onChange={handleWorriedFuelEmissionsChange}
                            />
                            <label htmlFor="no-fuel-emissions">No</label>
                            <br/>

                            <label htmlFor="carNumber">How many cars do you have in your family?</label>
                            <input
                                type="number"
                                id="carNumber"
                                value={carNumber}
                                onChange={handleCarNumberChange}
                                required
                                min="0"
                            />
                            <br/>
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

            {alert.showAlert && (
                <div className="custom-alert">
                    <div className="custom-alert-content">
                        <p>{alert.alertMessage}</p>
                        <button className="custom-alert-button" onClick={handleAlertClose}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
