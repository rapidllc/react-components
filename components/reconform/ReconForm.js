import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import htmlForm from '../htmlForm';
import Input from '../input/Input';
// //import TextArea from '../fields/TextArea';
import ActionButton from '../button/Button.js';
import Select from '../select/Select.js';
import SelectOptGroups from '../select/SelectOptGroups.js';
import '../button/Button.scss';

const ReconhtmlForm = ({
  selectProjectionsFile,
  selectAttenuationFile,
  reconstructFile
   
}) => {

  const [projectionsFile, setProjectionsFile] = useState('.dcm');
  const [parametersFile, setParametersFile] = useState('.prj');
  const [radioChangeAttenuation, setRadioChangeAttenuation] = useState('');
  const [checkboxChange, setCheckboxChange] = useState('');
  const [radioChangeCDR, setRadioChangeCDR] = useState('');

  const SetCheckboxChange = (event) => {
    setCheckboxChange(event.target.value);
  }

  const SetRadioChangeCDR = (event) => {
    setRadioChangeCDR(event.target.value);
  }

  
  const SetRadioChangeAttenuation = (event) => {
    console.log('SetRadioChangeAttenuation ', radioChangeAttenuation)
    setRadioChangeAttenuation(event.target.value);
  }

  const radionuclide = [
    {
      value: "Lu-177",
      text: "Lu-177",
      optgroup: "Group 1"
    },

  ];


  const scanner = [
    {
      value: "Intevo",
      text: "Intevo",
      optgroup: "Siemens"
    },

  ];


  const collimator = [
    {
      value: "MEGP",
      text: "MEGP",
      optgroup: "Siemens"
    },

  ];

  const window = [
    {
      value: "Lu-177_w1",
      text: "Lu-177_w1",
      optgroup: ""
    },
    {
      value: "Lu-177_w2",
      text: "Lu-177_w2",
      optgroup: ""
    },
  ];

  const groupedOptions = {};
  scanner.forEach(option => {
    if (!groupedOptions[option.optgroup]) groupedOptions[option.optgroup] = [];
    groupedOptions[option.optgroup].push({
      value: option.value,
      text: option.text
    });
  });


  return (
    <>
      <fieldset>
        <ActionButton red children={"Select .dcm"} onClick={selectProjectionsFile} />
        <br />
        <label className="BaseField__label" htmlFor="Projectionsfile">Projections File:
          <input type="text" className="Input" name="Projectionsfile" value={projectionsFile} onChange={() => setProjectionsFile(value)} />
        </label>

        <label className="BaseField__label" htmlFor="Radionuclide">Radionuclide:
        <select className="Select__select" name="Radionuclide" placeholder="">
            <option value="">None</option>
            <option value="Lu-177">Lu-177</option>
          </select>
        </label>
        <label className="BaseField__label" htmlFor="Collimator">Scanner:
        <SelectOptGroups groupedOptions={groupedOptions}>
          </SelectOptGroups>
        </label>

        <label className="BaseField__label" htmlFor="Collimator">Collimator:
        <select className="Select__select" name="Collimator" placeholder="">
            <option value="">None</option>
            <option value="MEGP">MEGP</option>
          </select>
        </label>

        <label className="BaseField__label" htmlFor="Window">Window:
        <select className="Select__select" name="Window" placeholder="">
            <option value="">None</option>
            <option value="Lu-177_w1">Lu-177_w1</option>
            <option value="Lu-177_w2">Lu-177_w2</option>
          </select>
        </label>

{/* these should be radio buttons one for Attenuation and the other for both Attenuation && Scatter

SetRadioChangeAttenuation

*/}
        <div>

        <label htmlFor="Attenuation" className="BaseField__label">
          <input type="radio" id="Attenuation" name="Attenuation" value="Attenuation"
             checked={radioChangeAttenuation === "Attenuation"}
             onChange={SetRadioChangeAttenuation}
              />Attenuation:
        </label>
        <label htmlFor="AttenuationScatter" className="BaseField__label">
          <input type="radio" id="AttenuationScatter" name="AttenuationScatter" value="AttenuationScatter" 
            checked={radioChangeAttenuation === "AttenuationScatter"}
            onChange={SetRadioChangeAttenuation}
            />Attenuation and Scatter:
        </label>

       
        </div>


        <div>
        <label htmlFor="Full_CDR" className="BaseField__label">
          <input type="radio" id="Full_CDR" name="Full_CDR" value="Full_CDR"
             checked={radioChangeCDR === "Full_CDR"}
             onChange={SetRadioChangeCDR}
              />Full CDR
        </label>
        <label htmlFor="Geometric_CDR" className="BaseField__label">
          <input type="radio" id="Geometric_CDR" name="Geometric_CDR" value="Geometric_CDR" 
            checked={radioChangeCDR === "Geometric_CDR"}
            onChange={SetRadioChangeCDR}
            />Geometric CDR
        </label>
        <label htmlFor="Neither" className="BaseField__label">
          <input type="radio" id="Neither" name="Neither" value="Neither" 
            checked={radioChangeCDR === "Neither"}
            onChange={SetRadioChangeCDR}
            />Neither
        </label>
        </div>
      
      <ActionButton red children={"Select .dcm"} onClick={selectProjectionsFile} />
        <br />
        <label className="BaseField__label" htmlFor="Attenuationfile">Attenuation File:
          <input type="text" className="Input" name="Attenuationfile" 
          value={projectionsFile} onChange={() => setProjectionsFile(value)} 
          />
        </label>

        <ActionButton red children={"Reconstruct"} onClick={reconstructFile} />
      
        </fieldset>
    </>
  );

}

export default ReconhtmlForm;