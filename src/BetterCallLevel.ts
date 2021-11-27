export enum BetterCallLevel {
    INFO       = 0b00000010,
    LOG        = 0b00000100,
    DEBUG      = 0b00001000,
    WARNING    = 0b00010000,
    ERROR      = 0b00100000,
    OFF        = 0b00000000, 
    ALL        = 0b11111111,
}