// 2-1-3-4
const compareTime = (a: any, b: any) => {
    const a1 = a.data.time.from.post
    const a2 = a.data.time.from.ante
    const a3 = a.data.time.to.post
    const a4 = a.data.time.to.ante

    const b1 = b.data.time.from.post
    const b2 = b.data.time.from.ante
    const b3 = b.data.time.to.post
    const b4 = b.data.time.to.ante

    if (a2 === b2) {
        if (a1 === b1) {
            if (a3 === b3) {
                return a4 < b4 ? -1 : 1
            } else {
                return a3 < b3 ? -1 : 1
            }
        } else {
            return a1 < b1 ? -1 : 1
        }
    } else {
        return a2 < b2 ? -1 : 1
    }
}

export enum ComponentTypes {
    NameComponent = '1',
    GeoComponent = '2',
    CommunityComponent = '3',
    StatusComponent = '4',
    SuperiorComponent = '5',
    FigureComponent = '6',
    DedicationComponent = '7',
    EventComponent = '8',
    ReferenceComponent = '9',
}

export var DictComponentTypes = [
    {
        id: ComponentTypes.NameComponent,
        value: 'name',
        filterAttr: 'componentName',
        editorOrder: 1,
        editorColumns: ['name', 'length', 'importance', 'language'],
        sort: (a: any, b: any) => {
            if (!a.data.value) {
                return 1
            }
            if (!b.data.value) {
                return -1
            }
            return a.data.value.toLowerCase() > b.data.value.toLowerCase()
                ? 1
                : -1
        },
        defaultData: {
            value: '',
            length: '1',
            importance: '1',
            language: '1',
        },
    },
    {
        id: ComponentTypes.GeoComponent,
        value: 'geo',
        filterAttr: 'componentGeo',
        editorOrder: 2,
        editorColumns: ['x', 'y', 'geo-certainty'],
        sort: (a: any, b: any) =>
            a.data.confidence > b.data.confidence ? 1 : -1,
        defaultData: {
            x: false,
            y: false,
            confidence: '1',
        },
    },
    {
        id: ComponentTypes.CommunityComponent,
        value: 'community',
        filterAttr: 'componentCommunity',
        editorOrder: 3,
        editorColumns: ['order', 'gender', 'motherhouse', 'time'],
        sort: (a: any, b: any) => compareTime(a, b),
        defaultData: {
            order: '0',
            gender: '0',
            filiation: '',
            time: {
                from: { ante: false, post: false },
                to: { ante: false, post: false },
            },
        },
    },
    {
        id: ComponentTypes.StatusComponent,
        value: 'status',
        filterAttr: 'componentStatus',
        editorOrder: 4,
        editorColumns: ['status', 'time'],
        sort: (a: any, b: any) => compareTime(a, b),
        defaultData: {
            value: '0',
            time: {
                from: { ante: false, post: false },
                to: { ante: false, post: false },
            },
        },
    },
    {
        id: ComponentTypes.SuperiorComponent,
        value: 'superior',
        filterAttr: 'componentSuperior',
        editorOrder: 5,
        editorColumns: ['name', 'type', 'time'],
        sort: (a: any, b: any) => compareTime(a, b),
        defaultData: {
            name: '',
            type: '0',
            time: {
                from: { ante: false, post: false },
                to: { ante: false, post: false },
            },
        },
    },
    {
        id: ComponentTypes.FigureComponent,
        value: 'figure',
        filterAttr: 'componentFigure',
        editorOrder: 6,
        editorColumns: ['name', 'role', 'standing', 'time'],
        sort: (a: any, b: any) => compareTime(a, b),
        defaultData: {
            name: '',
            role: '0',
            occupation: '0',
            time: {
                from: { ante: false, post: false },
                to: { ante: false, post: false },
            },
        },
    },
    {
        id: ComponentTypes.DedicationComponent,
        value: 'dedication',
        filterAttr: 'componentDedication',
        editorOrder: 7,
        editorColumns: ['dedication', 'language', 'time'],
        sort: (a: any, b: any) => compareTime(a, b),
        defaultData: {
            value: '',
            language: '1',
            time: {
                from: { ante: false, post: false },
                to: { ante: false, post: false },
            },
        },
    },
    {
        id: ComponentTypes.EventComponent,
        value: 'event',
        filterAttr: 'componentEvent',
        editorOrder: 8,
        editorColumns: ['description', 'type', 'time'],
        sort: (a: any, b: any) => compareTime(a, b),
        defaultData: {
            description: '',
            type: '0',
            time: {
                from: { ante: false, post: false },
                to: { ante: false, post: false },
            },
        },
    },
    {
        id: ComponentTypes.ReferenceComponent,
        value: 'reference',
        filterAttr: 'componentReference',
        editorOrder: 9,
        editorColumns: ['title', 'url', 'type'],
        sort: (a: any, b: any) =>
            a.data.title.toLowerCase() > b.data.title.toLowerCase() ? 1 : -1,
        defaultData: {
            title: '',
            url: '',
            type: '1',
        },
    },
]
