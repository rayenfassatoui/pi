import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Plus, Trash2, GripVertical } from 'lucide-react';

const StepsEditor = ({ steps = [], onChange }) => {
    const addStep = () => {
        onChange([...steps, { text: '', image: '' }]);
    };

    const removeStep = (index) => {
        const newSteps = steps.filter((_, i) => i !== index);
        onChange(newSteps);
    };

    const updateStep = (index, field, value) => {
        const newSteps = [...steps];
        newSteps[index] = { ...newSteps[index], [field]: value };
        onChange(newSteps);
    };

    return (
        <div className="space-y-4">
            {steps.map((step, index) => (
                <div key={index} className="flex gap-4 items-start p-4 border rounded-lg bg-card">
                    <div className="mt-2 text-muted-foreground">
                        <span className="font-bold text-lg">{index + 1}.</span>
                    </div>
                    <div className="flex-1 space-y-2">
                        <Textarea
                            placeholder={`Step ${index + 1} instructions...`}
                            value={step.text}
                            onChange={(e) => updateStep(index, 'text', e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive/90"
                        onClick={() => removeStep(index)}
                    >
                        <Trash2 className="h-5 w-5" />
                    </Button>
                </div>
            ))}
            
            <Button type="button" variant="outline" onClick={addStep} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Step
            </Button>
        </div>
    );
};

export default StepsEditor;
