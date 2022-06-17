import React from 'react';
import type { FlowStep, OutputItem } from '../../shared/resultTypes';
import type { LanguageName } from '../../shared/languages';
import { SimpleOutput } from './internal/SimpleOutput';
import { MemoryOutput } from './internal/MemoryOutput';
import { MemoryGraphOutput } from './internal/MemoryGraphOutput';
import { GroupOutput, InspectionGroup } from './internal/GroupOutput';

type Props = {
    output: ReadonlyArray<OutputItem|InspectionGroup>;

    sourceCode: string;
    sourceLanguage: LanguageName;
    flow?: ReadonlyArray<FlowStep> | null;
};

export const OutputView: React.FC<Props> = ({ output }) => {
    const renderItem = (item: OutputItem|InspectionGroup, index: number) => {
        if (typeof item === 'string')
            return <pre key={index}>{item}</pre>;

        switch (item.type) {
            case 'inspection:simple': return <SimpleOutput key={index} inspection={item} />;
            case 'inspection:memory': return <MemoryOutput key={index} inspection={item} />;
            case 'inspection:memory-graph': return <MemoryGraphOutput key={index} inspection={item} />;
            case 'inspection:group': return <GroupOutput key={index} group={item} />;
        }
    };

    return <div className="output result-content">
        {!output.length && <div className="output-empty">Completed — no output.</div>}
        {output.map(renderItem)}
    </div>;
};