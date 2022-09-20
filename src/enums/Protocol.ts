export enum Protocol {
    FSX_RTM = 0x2,
    FSX_SP1 = 0x3, // supports enhanced client data, facilites, and modeless ui
    FSX_SP2 = 0x4, // FSX SP2/Acceleration, racing and another flight save
}

module.exports = {
    Protocol,
};
