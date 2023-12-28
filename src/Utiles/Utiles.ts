export const convertFormDataToApiFormat = (formData: Record<string, string>)=> {
    const {id, name, linkedFeature, ...childrenFields } = formData;
  
    const apiFormat = {
      name,
      children: [] as { [key: string]: string }[],
    };
  
    // Iterate over the children fields and add dynamically
    for (const [key, value] of Object.entries(childrenFields)) {
      apiFormat.children.push({
        name: value,
      });
    }
  
    return apiFormat;
  }

