import React, { useState } from 'react';
import { submitQuoteForm } from './API';

const states = [
  { name: 'Alabama', short: 'AL' },
  { name: 'Alaska', short: 'AK' },
  { name: 'Arizona', short: 'AZ' },
  { name: 'Arkansas', short: 'AR' },
  { name: 'California', short: 'CA' },
  { name: 'Colorado', short: 'CO' },
  { name: 'Connecticut', short: 'CT' },
  { name: 'Delaware', short: 'DE' },
  { name: 'Florida', short: 'FL' },
  { name: 'Georgia', short: 'GA' },
  { name: 'Hawaii', short: 'HI' },
  { name: 'Idaho', short: 'ID' },
  { name: 'Illinois', short: 'IL' },
  { name: 'Indiana', short: 'IN' },
  { name: 'Iowa', short: 'IA' },
  { name: 'Kansas', short: 'KS' },
  { name: 'Kentucky', short: 'KY' },
  { name: 'Louisiana', short: 'LA' },
  { name: 'Maine', short: 'ME' },
  { name: 'Maryland', short: 'MD' },
  { name: 'Massachusetts', short: 'MA' },
  { name: 'Michigan', short: 'MI' },
  { name: 'Minnesota', short: 'MN' },
  { name: 'Mississippi', short: 'MS' },
  { name: 'Missouri', short: 'MO' },
  { name: 'Montana', short: 'MT' },
  { name: 'Nebraska', short: 'NE' },
  { name: 'Nevada', short: 'NV' },
  { name: 'New Hampshire', short: 'NH' },
  { name: 'New Jersey', short: 'NJ' },
  { name: 'New Mexico', short: 'NM' },
  { name: 'New York', short: 'NY' },
  { name: 'North Carolina', short: 'NC' },
  { name: 'North Dakota', short: 'ND' },
  { name: 'Ohio', short: 'OH' },
  { name: 'Oklahoma', short: 'OK' },
  { name: 'Oregon', short: 'OR' },
  { name: 'Pennsylvania', short: 'PA' },
  { name: 'Rhode Island', short: 'RI' },
  { name: 'South Carolina', short: 'SC' },
  { name: 'South Dakota', short: 'SD' },
  { name: 'Tennessee', short: 'TN' },
  { name: 'Texas', short: 'TX' },
  { name: 'Utah', short: 'UT' },
  { name: 'Vermont', short: 'VT' },
  { name: 'Virginia', short: 'VA' },
  { name: 'Washington', short: 'WA' },
  { name: 'West Virginia', short: 'WV' },
  { name: 'Wisconsin', short: 'WI' },
  { name: 'Wyoming', short: 'WY' }
];

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    state: '',
    zipcode: '',
    age: '',
    decision_maker: '',
    is_disabled: '',
    gov_benefits: '',
    unemployed: '',
    work_full_time: '',
    treated_12_years: '',
    lawyer_or_attorney: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const zipRegex = /^\d{5}$/;

    if (!formData.first_name) errors.first_name = 'First Name is required.';
    else if (formData.first_name.length < 4) errors.first_name = 'First Name must be at least 4 characters long.';

    if (!formData.last_name) errors.last_name = 'Last Name is required.';
    else if (formData.last_name.length < 4) errors.last_name = 'Last Name must be at least 4 characters long.';

    if (!formData.phone) errors.phone = 'Phone Number is required.';
    else if (!phoneRegex.test(formData.phone)) errors.phone = 'Phone Number must be 10 digits.';

    if (!formData.email) errors.email = 'Email is required.';
    else if (!emailRegex.test(formData.email)) errors.email = 'Invalid Email format.';

    if (!formData.state) errors.state = 'State is required.';

    if (!formData.zipcode) errors.zipcode = 'Zip Code is required.';
    else if (!zipRegex.test(formData.zipcode)) errors.zipcode = 'Zip Code must be 5 digits.';

    if (!formData.age || formData.age < 51) errors.age = 'Age must be 51 or above.';
    if (!formData.decision_maker) errors.decision_maker = 'Decision Maker field is required.';
    if (!formData.is_disabled) errors.is_disabled = 'Is Disabled field is required.';
    if (!formData.gov_benefits) errors.gov_benefits = 'Government Benefits field is required.';
    if (!formData.unemployed) errors.unemployed = 'Unemployed field is required.';
    if (!formData.work_full_time) errors.work_full_time = 'Work Full-Time field is required.';
    if (!formData.treated_12_years) errors.treated_12_years = 'Treated in Past 12 Years field is required.';
    if (!formData.lawyer_or_attorney) errors.lawyer_or_attorney = 'Lawyer or Attorney field is required.';
    
    setError(errors);

    // Focus on the first field with an error
    if (Object.keys(errors).length > 0) {
      const firstErrorField = document.querySelector(`[name=${Object.keys(errors)[0]}]`);
      if (firstErrorField) firstErrorField.focus();
    }

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const result = await submitQuoteForm(formData);
      setSuccess('Form submitted successfully!');
      console.log(result); // Handle success
    } catch (err) {
      setError({ global: 'An error occurred while submitting the form.' });
      console.error(err); // Handle the error
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <h2>See if you Qualify</h2>
      
      <div className="form-group">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          className={error.first_name ? 'error' : ''}
        />
        {error.first_name && <span className="error-message">{error.first_name}</span>}
      </div>
      
      <div className="form-group">
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          className={error.last_name ? 'error' : ''}
        />
        {error.last_name && <span className="error-message">{error.last_name}</span>}
      </div>
      
      <div className="form-group">
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className={error.phone ? 'error' : ''}
        />
        {error.phone && <span className="error-message">{error.phone}</span>}
      </div>
      
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={error.email ? 'error' : ''}
        />
        {error.email && <span className="error-message">{error.email}</span>}
      </div>
      
      <div className="form-group">
        <select
          name="state"
          onChange={handleChange}
          value={formData.state}
          className={error.state ? 'error' : ''}
        >
          <option value="">Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state.short}>{state.name} ({state.short})</option>
          ))}
        </select>
        {error.state && <span className="error-message">{error.state}</span>}
      </div>
      
      <div className="form-group">
        <input
          type="text"
          name="zipcode"
          placeholder="Zip Code"
          value={formData.zipcode}
          onChange={handleChange}
          className={error.zipcode ? 'error' : ''}
        />
        {error.zipcode && <span className="error-message">{error.zipcode}</span>}
      </div>
      
      <div className="form-group">
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className={error.age ? 'error' : ''}
        />
        {error.age && <span className="error-message">{error.age}</span>}
      </div>
      
      <div className="form-group">
        <select
          name="decision_maker"
          onChange={handleChange}
          value={formData.decision_maker}
          className={error.decision_maker ? 'error' : ''}
        >
          <option value="">Are you a Health Care Decision Maker?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {error.decision_maker && <span className="error-message">{error.decision_maker}</span>}
      </div>
      
      <div className="form-group">
        <select
          name="is_disabled"
          onChange={handleChange}
          value={formData.is_disabled}
          className={error.is_disabled ? 'error' : ''}
        >
          <option value="">Are you disabled?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {error.is_disabled && <span className="error-message">{error.is_disabled}</span>}
      </div>
      
      <div className="form-group">
        <select
          name="gov_benefits"
          onChange={handleChange}
          value={formData.gov_benefits}
          className={error.gov_benefits ? 'error' : ''}
        >
          <option value="">Are you receiving any government benefits?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {error.gov_benefits && <span className="error-message">{error.gov_benefits}</span>}
      </div>
      
      <div className="form-group">
        <select
          name="unemployed"
          onChange={handleChange}
          value={formData.unemployed}
          className={error.unemployed ? 'error' : ''}
        >
          <option value="">Have you been unemployed for a while?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {error.unemployed && <span className="error-message">{error.unemployed}</span>}
      </div>
      
      <div className="form-group">
        <select
          name="work_full_time"
          onChange={handleChange}
          value={formData.work_full_time}
          className={error.work_full_time ? 'error' : ''}
        >
          <option value="">Have you worked full-time in a company?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {error.work_full_time && <span className="error-message">{error.work_full_time}</span>}
      </div>
      
      <div className="form-group">
        <select
          name="treated_12_years"
          onChange={handleChange}
          value={formData.treated_12_years}
          className={error.treated_12_years ? 'error' : ''}
        >
          <option value="">Have you been treated in the past 12 years?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {error.treated_12_years && <span className="error-message">{error.treated_12_years}</span>}
      </div>
      
      <div className="form-group">
        <select
          name="lawyer_or_attorney"
          onChange={handleChange}
          value={formData.lawyer_or_attorney}
          className={error.lawyer_or_attorney ? 'error' : ''}
        >
          <option value="">Do you have a lawyer or attorney?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {error.lawyer_or_attorney && <span className="error-message">{error.lawyer_or_attorney}</span>}
      </div>
      
      <div className="legal-notice">
        <p className="privacy-notice">
          By clicking the "Get Quote" button below, you acknowledge and agree to our 
          <a href="#">Privacy Policy</a> & <a href="#">Terms and Conditions</a>. By providing your contact information, 
          you authorize HealthCareConnect, its partners, and affiliates to contact you via email, telephone calls, 
          pre-recorded messages, ringless voicemails, and text messages at the number you provided. These communications 
          may be conducted using an autodialer and may include offers about products or services related to healthcare exploration.
        </p>
        <p className="legal-text">
          Copyright © 2024 MH Sub I, LLC dba Nolo ® Self-help services may not be permitted in all states. 
          The information provided on this site is not legal advice, does not constitute a lawyer/advocate referral service, 
          and no attorney-client/advocate-client or confidential relationship is or will be formed by use of the site. 
          The attorney listings on this site are paid attorney advertising. In some states, the information on this website 
          may be considered a lawyer/advocate referral service. Please reference the Terms of Use and the Supplemental Terms 
          for specific information related to your state. Your use of this website constitutes acceptance of the Terms of Use, 
          Supplemental Terms, IB Privacy Policy and Cookie Policy. Consumer Health Data Notice. Your Privacy Choices.
        </p>
      </div>

      <button type="submit" disabled={loading}>Get Quote</button>
      {loading && <p>Loading...</p>}
      {error.global && <p style={{ color: 'red' }}>{error.global}</p>}
      {success && <p style={{ color: 'green', fontSize:'25px' }}>{success}</p>}
    </form>
     
    
    
     
  );
};

export default QuoteForm;
