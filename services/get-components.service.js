import 'whatwg-fetch';
import CatBanner from '@/components/CatBanner/CatBanner';
import CatContentBenefits from '@/components/CatContent/CatContentBenefits';
import CatContentComplete from '@/components/CatContent/CatContentComplete';
import CatContentCta from '@/components/CatContent/CatContentCta';
import CatContentService from '@/components/CatContent/CatContentService';
import CatContentUsps from '@/components/CatContent/CatContentUsps';
import CatContentCallMeNow from '@/components/CatContent/CatContentCallMeNow';
import CatContentHelp from '@/components/CatContent/CatContentHelp';
import CatPackages from '@/components/CatPackages/CatPackages';
import PageFooter from '@/components/Generic/PageFooter/PageFooter';
import PageHeader from '@/components/Generic/Header/PageHeader';
import BusinessCustomer from '@/components/CatContent/CatBusinessCustomer';
import CatPackagesNavigationButton from '@/components/CatContent/CatPackageNavigationButton';
import getComponentsApiService from './get-components-api.service';

const getComponent = {

    getCatPageArray() {
        // let component = {
        //     type: 'cat',
        //     value: 'PageHeader,CatBanner, CatPackages,BusinessCustomer,CatContentUsps,CatContentCta, CatContentComplete, CatContentService,CatContentCallMeNow,CatPackagesNavigationButton,CatContentBenefits,CatContentHelp,PageFooter'
        // };
        // getComponentsApiService.addComponents(component);
        return getComponentsApiService.getComponents();
    },

    getCatPageComponents(components) {
        let componentObjects = [];
        components.forEach(comp => {
            componentObjects.push(this.componentsMap()[comp]);
        });
        return componentObjects;
    },

    saveComponents(data) {
        return getComponentsApiService.saveComponent(data);
    },

    componentsMap() {
        return {
            'CatBanner': CatBanner,
            'CatContentBenefits': CatContentBenefits,
            'CatContentComplete': CatContentComplete,
            'CatContentCta': CatContentCta,
            'CatContentService': CatContentService,
            'CatContentUsps': CatContentUsps,
            'CatContentCallMeNow': CatContentCallMeNow,
            'CatContentHelp': CatContentHelp,
            'CatPackages': CatPackages,
            'PageFooter': PageFooter,
            'PageHeader': PageHeader,
            'BusinessCustomer': BusinessCustomer,
            'CatPackagesNavigationButton': CatPackagesNavigationButton
        };
    }
};

export default getComponent;
