import Vue, { VueConstructor } from 'vue';
import type { AppOptions } from '../../ts/types/app';
import { languages } from '../../ts/helpers/languages';
import { targets } from '../../ts/helpers/targets';
import MobileSettings from '../../components/app-mobile-settings';
import { fromPartial } from '../helpers';
import {
    themeCases,
    themeAndStatusCases,
    loadComponentTemplate,
    renderComponent,
    PickPropTypes,
    mobilePortraitSize
} from './helpers';

beforeEach(() => {
    // console.log('beforeEach() starting');
    loadComponentTemplate('app-modal', 'internal');
    loadComponentTemplate('app-select-language');
    loadComponentTemplate('app-select-branch');
    loadComponentTemplate('app-section-branch-details');
    loadComponentTemplate('app-select-target');
    loadComponentTemplate('app-cm6-preview-manager');
    loadComponentTemplate('app-mobile-settings');
    // console.log('beforeEach() completed');
});

test.each(themeAndStatusCases)('button%s', async (_, bodyClass) => {
    // console.log(`button${_} starting`);
    const settings = createSettings({ options: fromPartial({}) });

    const rendered = await renderComponent(settings, { bodyClass, ...mobilePortraitSize });

    expect(rendered).toMatchImageSnapshot();
    // console.log(`button${_} completed`);
});

test.each(themeCases)('modal open%s', async (_, bodyClass) => {
    // console.log(`modal open${_} starting`);
    const PortalTarget = (Vue as unknown as { options: { components: { PortalTarget: VueConstructor } } }).options.components.PortalTarget;
    const options: AppOptions = {
        language: languages.csharp,
        target: targets.il,
        release: true,
        branch: null
    };
    const parent = new Vue({
        el: document.createElement('div'),
        render(h) {
            return h('div', [
                h(MobileSettings, { props: { options, branches: [] } }),
                h(PortalTarget, { props: { name: 'modals', multiple: true, slim: true } })
            ]);
        }
    });

    const settings = parent.$children[0];
    (settings as InstanceType<typeof MobileSettings>).openModal();
    await Vue.nextTick();

    const rendered = await renderComponent(parent, { bodyClass, ...mobilePortraitSize });

    parent.$destroy();
    expect(rendered).toMatchImageSnapshot();
    // console.log(`modal open${_} completed`);
});

function createSettings({ options }: PickPropTypes<typeof MobileSettings, 'options'>) {
    return new MobileSettings({
        el: document.createElement('div'),
        propsData: { options }
    });
}