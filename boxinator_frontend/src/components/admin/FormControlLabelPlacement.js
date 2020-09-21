import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function FormControlLabelPlacement() {
    return (
        <FormControl component="fieldset">
            <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <FormControlLabel
                    value="start"
                    control={<Radio color="primary" />}
                    label="Not-completed"
                    labelPlacement="com"
                />
                <FormControlLabel value="end" control={<Radio color="primary" />} label="completed" />
            </RadioGroup>
        </FormControl>
    );
}