https://www.adobe.com/devnet-apps/photoshop/fileformatashtml/

```
layer and mask infomation section{

    图层对象{
        图层对象数据长度
        图层数量
        每个图层信息：layer records{
            4*4 图层定位（上左下右）
            图层的通道数量
            通道信息：{
                通道id： 0 = red, 1 = green, etc.;
                通道详情：-1 = transparency mask; -2 = user supplied layer mask, -3 real user supplied layer mask (when both a user mask and a vector mask are present)
            }
            混合模式签名：'8BIM'
            混合模式关键字：'pass' = pass through, 'norm' = normal, 'diss' = dissolve, 'dark' = darken, 'mul ' = multiply, 'idiv' = color burn, 'lbrn' = linear burn, 'dkCl' = darker color, 'lite' = lighten, 'scrn' = screen, 'div ' = color dodge, 'lddg' = linear dodge, 'lgCl' = lighter color, 'over' = overlay, 'sLit' = soft light, 'hLit' = hard light, 'vLit' = vivid light, 'lLit' = linear light, 'pLit' = pin light, 'hMix' = hard mix, 'diff' = difference, 'smud' = exclusion, 'fsub' = subtract, 'fdiv' = divide 'hue ' = hue, 'sat ' = saturation, 'colr' = color, 'lum ' = luminosity,
            透明度：0-255 Opacity. 0 = transparent ... 255 = opaque
            裁剪：Clipping: 0 = base, 1 = non-base
            Flags：bit 0 = transparency protected;
                  bit 1 = visible;
                  bit 2 = obsolete;
                  bit 3 = 1 for Photoshop 5.0 and later, tells if bit 4 has useful information;
                  bit 4 = pixel data irrelevant to appearance of document
            补白：filler(zero)
            额外信息长度：Length of the extra data field ( = the total length of the next five fields).
            图层mask信息：{
                信息长度
                位置：上左下右
                默认颜色：0|| 255
                flags：bit 0 = position relative to layer
                        bit 1 = layer mask disabled
                        bit 2 = invert layer mask when blending (Obsolete)
                        bit 3 = indicates that the user mask actually came from rendering other data
                        bit 4 = indicates that the user and/or vector masks have parameters applied to them
                    
                Mask Parameters. Only present if bit 4 of Flags set above.
                
                Mask Parameters bit flags present as follows:
                bit 0 = user mask density, 1 byte
                bit 1 = user mask feather, 8 byte, double
                bit 2 = vector mask density, 1 byte
                bit 3 = vector mask feather, 8 bytes, double
                
                Padding. Only present if size = 20. Otherwise the following is present
                Real Flags. Same as Flags information above.
                Real user mask background. 0 or 255.
                Rectangle enclosing layer mask: Top, left, bottom, right.
                
            }
            图层混合范围：{
                Length of layer blending ranges data
                Composite gray blend source. Contains 2 black values followed by 2 white values. Present but irrelevant for Lab & Grayscale.
                Composite gray blend destination range
                First channel source range
                First channel destination range
                Second channel source range
                Second channel destination range
                ...
            }
            图层名字：
            additional layer infomation：{//详情再下面}
        }
        
        通道图片信息:{
            Compression. 0 = Raw Data, 1 = RLE compressed, 2 = ZIP without prediction, 3 = ZIP with prediction.
        }
    }
    
    Global layer mask info:{
        Length of global layer mask info section.
        Overlay color space (undocumented).
        4 * 2 byte color components
        Opacity. 0 = transparent, 100 = opaque.
        Kind. 0 = Color selected--i.e. inverted; 1 = Color protected;128 = use value stored per layer. This value is preferred. The others are for backward compatibility with beta versions.
        Filler: zeros
    
    }
    additional layer infomation:{//此处是文档写的，但是实际位于每个图层信息里
        Signature: '8BIM' or '8B64'
        Key: a 4-character code (See individual sections)
        Length data below, rounded up to an even byte count.
        Data
    }
}

Adjustment layers can have one of the following keys:
'SoCo' = Solid Color
'GdFl' = Gradient
'PtFl' = Pattern
'brit' = Brightness/Contrast
'levl' = Levels
'curv' = Curves
'expA' = Exposure
'vibA' = Vibrance
'hue ' = Old Hue/saturation, Photoshop 4.0
'hue2' = New Hue/saturation, Photoshop 5.0
'blnc' = Color Balance
'blwh' = Black and White
'phfl' = Photo Filter
'mixr' = Channel Mixer
'clrL' = Color Lookup
'nvrt' = Invert
'post' = Posterize
'thrs' = Threshold
'grdm' = Gradient Map
'selc' = Selective color
```