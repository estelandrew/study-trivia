export const slugifyCategoryName = (name: string) => {
    if (name === 'Arts & Literature') {
        return 'arts-and-literature';
    } else {        
        return name.toLowerCase();
    }
}