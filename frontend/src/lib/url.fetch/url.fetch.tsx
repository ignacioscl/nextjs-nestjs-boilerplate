const urlFetch = (url:UrlEnum) => {

    const getUrl = () => {
      //TODO: poner la implementacion que busque en parametricdatasystem o en algun lugar donde esten las urls, sino ir agregando a mano las url en el enum
        return url;
    }
    return {getUrl}
      /*const getEnumValue = (enumKey: keyof typeof UrlEnum): UrlEnum => {
        return UrlEnum[enumKey];
      };*/
}

export enum UrlEnum {
    ROLE = '/api/roles',
    TEST = "/api/test"
}

export default urlFetch;