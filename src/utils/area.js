
// const area = (option) => {
//   var allArea = [
//     {
//       value: '北京', label: '北京',
//       children: [
//         {
//           value: '北京', label: '北京',
//           children: [
//             {
//               value: '东城区', label: '东城区',
//               value: '西城区', label: '西城区',
//               value: '崇文区', label: '崇文区',
//               value: '宣武区', label: '宣武区',
//               value: '朝阳区', label: '朝阳区',
//               value: '丰台区', label: '丰台区',
//               value: '石景山区', label: '石景山区',
//               value: '海淀区', label: '海淀区',
//               value: '门头沟区', label: '门头沟区',
//               value: '房山区', label: '房山区',
//               value: '通州区', label: '通州区',
//               value: '顺义区', label: '顺义区',
//               value: '昌平区', label: '昌平区',
//               value: '大兴区', label: '大兴区',
//               value: '怀柔区', label: '怀柔区',
//               value: '平谷区', label: '平谷区',
//               value: '密云县', label: '密云县',
//               value: '延庆县', label: '延庆县'
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '天津', label: '天津',
//       children: [
//         {
//           value: '天津', label: '天津',
//           children: [
//             {
//               value: '和平区', label: '和平区',
//               value: '河东区', label: '河东区',
//               value: '河西区', label: '河西区',
//               value: '南开区', label: '南开区',
//               value: '河北区', label: '河北区',
//               value: '红桥区', label: '红桥区',
//               value: '塘沽区', label: '塘沽区',
//               value: '汉沽区', label: '汉沽区',
//               value: '大港区', label: '大港区',
//               value: '东丽区', label: '东丽区',
//               value: '西青区', label: '西青区',
//               value: '津南区', label: '津南区',
//               value: '北辰区', label: '北辰区',
//               value: '武清区', label: '武清区',
//               value: '宝坻区', label: '宝坻区',
//               value: '静海县', label: '静海县',
//               value: '蓟县', label: '蓟县'
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '河北省', label: '河北省',
//       children: [
//         {
//           value: '石家庄市', label: '石家庄市',
//           children: [
//             {
//               value: '', label: '长安区',
//               value: '', label: '桥东区',
//               value: '', label: '桥西区',
//               value: '', label: '新华区',
//               value: '', label: '井陉矿区',
//               value: '', label: '裕华区',
//               value: '', label: '井陉县',
//               value: '', label: '正定县',
//               value: '', label: '栾城县',
//               value: '', label: '行唐县',
//               value: '', label: '灵寿县',
//               value: '', label: '高邑县',
//               value: '', label: '深泽县',
//               value: '', label: '赞皇县',
//               value: '', label: '无极县',
//               value: '', label: '平山县',
//               value: '', label: '元氏县',
//               value: '', label: '赵县',
//               value: '', label: '辛集市',
//               value: '', label: '藁城市',
//               value: '', label: '晋州市',
//               value: '', label: '新乐市',
//               value: '', label: '鹿泉市'
//             }
//           ]
//         },
//         {
//           value: '唐山市', label: '唐山市',
//           children: [
//             {
//               value: '', label: '路南区',
//               value: '', label: '路北区',
//               value: '', label: '古冶区',
//               value: '', label: '开平区',
//               value: '', label: '丰南区',
//               value: '', label: '丰润区',
//               value: '', label: '滦县',
//               value: '', label: '滦南县',
//               value: '', label: '乐亭县',
//               value: '', label: '迁西县',
//               value: '', label: '玉田县',
//               value: '', label: '唐海县',
//               value: '', label: '遵化市',
//               value: '', label: '迁安市'
//             }
//           ]
//         },
//         {
//           value: '秦皇岛市', label: '秦皇岛市',
//           children: [
//             {
//               value: '', label: '海港区',
//               value: '', label: '山海关区',
//               value: '', label: '北戴河区',
//               value: '', label: '青龙满族自治县',
//               value: '', label: '昌黎县',
//               value: '', label: '抚宁县',
//               value: '', label: '卢龙县',
//               value: '', label: '经济技术开发区'
//             }
//           ]
//         },
//         {
//           value: '邯郸市', label: '邯郸市',
//           children: [
//             {
//               value: '', label: '邯山区',
//               value: '', label: '丛台区',
//               value: '', label: '复兴区',
//               value: '', label: '峰峰矿区',
//               value: '', label: '邯郸县',
//               value: '', label: '临漳县',
//               value: '', label: '成安县',
//               value: '', label: '大名县',
//               value: '', label: '涉县',
//               value: '', label: '磁县',
//               value: '', label: '肥乡县',
//               value: '', label: '永年县',
//               value: '', label: '邱县',
//               value: '', label: '鸡泽县',
//               value: '', label: '广平县',
//               value: '', label: '馆陶县',
//               value: '', label: '魏县',
//               value: '', label: '曲周县',
//               value: '', label: '武安市'
//             }
//           ]
//         },
//         {
//           value: '邢台市', label: '邢台市',
//           children: [
//             {
//               value: '', label: '桥东区',
//               value: '', label: '桥西区',
//               value: '', label: '邢台县',
//               value: '', label: '临城县',
//               value: '', label: '内丘县',
//               value: '', label: '柏乡县',
//               value: '', label: '隆尧县',
//               value: '', label: '任县',
//               value: '', label: '南和县',
//               value: '', label: '宁晋县',
//               value: '', label: '巨鹿县',
//               value: '', label: '新河县',
//               value: '', label: '广宗县',
//               value: '', label: '平乡县',
//               value: '', label: '威县',
//               value: '', label: '清河县',
//               value: '', label: '临西县',
//               value: '', label: '南宫市',
//               value: '', label: '沙河市'
//             }
//           ]
//         },
//         {
//           value: '保定市', label: '保定市',
//           children: [
//             {
//               value: '', label: '新市区',
//               value: '', label: '北市区',
//               value: '', label: '南市区',
//               value: '', label: '满城县',
//               value: '', label: '清苑县',
//               value: '', label: '涞水县',
//               value: '', label: '阜平县',
//               value: '', label: '徐水县',
//               value: '', label: '定兴县',
//               value: '', label: '唐县',
//               value: '', label: '高阳县',
//               value: '', label: '容城县',
//               value: '', label: '涞源县',
//               value: '', label: '望都县',
//               value: '', label: '安新县',
//               value: '', label: '易县',
//               value: '', label: '曲阳县',
//               value: '', label: '蠡县',
//               value: '', label: '顺平县',
//               value: '', label: '博野县',
//               value: '', label: '雄县',
//               value: '', label: '涿州市',
//               value: '', label: '定州市',
//               value: '', label: '安国市',
//               value: '', label: '高碑店市',
//               value: '', label: '高开区'
//             }
//           ]
//         },
//         {
//           value: '张家口市', label: '张家口市',
//           children: [
//             {
//               value: '', label: '桥东区',
//               value: '', label: '桥西区',
//               value: '', label: '宣化区',
//               value: '', label: '下花园区',
//               value: '', label: '宣化县',
//               value: '', label: '张北县',
//               value: '', label: '康保县',
//               value: '', label: '沽源县',
//               value: '', label: '尚义县',
//               value: '', label: '蔚县',
//               value: '', label: '阳原县',
//               value: '', label: '怀安县',
//               value: '', label: '万全县',
//               value: '', label: '怀来县',
//               value: '', label: '涿鹿县',
//               value: '', label: '赤城县',
//               value: '', label: '崇礼县'
//             }
//           ]
//         },
//         {
//           value: '承德市', label: '承德市',
//           children: [
//             {
//               value: '', label: '双桥区',
//               value: '', label: '双滦区',
//               value: '', label: '鹰手营子矿区',
//               value: '', label: '承德县',
//               value: '', label: '兴隆县',
//               value: '', label: '平泉县',
//               value: '', label: '滦平县',
//               value: '', label: '隆化县',
//               value: '', label: '丰宁满族自治县',
//               value: '', label: '宽城满族自治县',
//               value: '', label: '围场满族蒙古族自治县'
//             }
//           ]
//         },
//         {
//           value: '沧州市', label: '沧州市',
//           children: [
//             {
//               value: '', label: '新华区',
//               value: '', label: '运河区',
//               value: '', label: '沧县',
//               value: '', label: '青县',
//               value: '', label: '东光县',
//               value: '', label: '海兴县',
//               value: '', label: '盐山县',
//               value: '', label: '肃宁县',
//               value: '', label: '南皮县',
//               value: '', label: '吴桥县',
//               value: '', label: '献县',
//               value: '', label: '孟村回族自治县',
//               value: '', label: '泊头市',
//               value: '', label: '任丘市',
//               value: '', label: '黄骅市',
//               value: '', label: '河间市'
//             }
//           ]
//         },
//         {
//           value: '廊坊市', label: '廊坊市',
//           children: [
//             {
//               value: '', label: '安次区',
//               value: '', label: '广阳区',
//               value: '', label: '固安县',
//               value: '', label: '永清县',
//               value: '', label: '香河县',
//               value: '', label: '大城县',
//               value: '', label: '文安县',
//               value: '', label: '大厂回族自治县',
//               value: '', label: '开发区',
//               value: '', label: '燕郊经济技术开发区',
//               value: '', label: '霸州市',
//               value: '', label: '三河市'
//             }
//           ]
//         },
//         {
//           value: '衡水市', label: '衡水市',
//           children: [
//             {
//               value: '', label: '桃城区',
//               value: '', label: '枣强县',
//               value: '', label: '武邑县',
//               value: '', label: '武强县',
//               value: '', label: '饶阳县',
//               value: '', label: '安平县',
//               value: '', label: '故城县',
//               value: '', label: '景县',
//               value: '', label: '阜城县',
//               value: '', label: '冀州市',
//               value: '', label: '深州市'
//             }
//           ]
//         },
//       ]
//     },
//     {
//       value: '山西省', label: '山西省',
//       children: [
//         {
//           value: '太原市', label: '太原市',
//           children: [
//             {
//               value: '', label: '小店区',
//               value: '', label: '迎泽区',
//               value: '', label: '杏花岭区',
//               value: '', label: '尖草坪区',
//               value: '', label: '万柏林区',
//               value: '', label: '晋源区',
//               value: '', label: '清徐县',
//               value: '', label: '阳曲县',
//               value: '', label: '娄烦县',
//               value: '', label: '古交市'
//             }
//           ]
//         },
//         {
//           value: '大同市', label: '大同市',
//           children: [
//             {
//               value: '', label: '城区',
//               value: '', label: '矿区',
//               value: '', label: '南郊区',
//               value: '', label: '新荣区',
//               value: '', label: '阳高县',
//               value: '', label: '天镇县',
//               value: '', label: '广灵县',
//               value: '', label: '灵丘县',
//               value: '', label: '浑源县',
//               value: '', label: '左云县',
//               value: '', label: '大同县'
//             }
//           ]
//         },
//         {
//           value: '阳泉市', label: '阳泉市',
//           children: [
//             {
//               value: '', label: '城区',
//               value: '', label: '矿区',
//               value: '', label: '郊区',
//               value: '', label: '平定县',
//               value: '', label: '盂县'
//             }
//           ]
//         },
//         {
//           value: '长治市', label: '长治市',
//           children: [
//             {
//               value: '', label: '长治县',
//               value: '', label: '襄垣县',
//               value: '', label: '屯留县',
//               value: '', label: '平顺县',
//               value: '', label: '黎城县',
//               value: '', label: '壶关县',
//               value: '', label: '长子县',
//               value: '', label: '武乡县',
//               value: '', label: '沁县',
//               value: '', label: '沁源县',
//               value: '', label: '潞城市',
//               value: '', label: '城区',
//               value: '', label: '郊区',
//               value: '', label: '高新区'
//             }
//           ]
//         },
//         {
//           value: '晋城市', label: '晋城市',
//           children: [
//             {
//               value: '', label: '城区',
//               value: '', label: '沁水县',
//               value: '', label: '阳城县',
//               value: '', label: '陵川县',
//               value: '', label: '泽州县',
//               value: '', label: '高平市'
//             }
//           ]
//         },
//         {
//           value: '朔州市', label: '朔州市',
//           children: [
//             {
//               value: '', label: '朔城区',
//               value: '', label: '平鲁区',
//               value: '', label: '山阴县',
//               value: '', label: '应县',
//               value: '', label: '右玉县',
//               value: '', label: '怀仁县'
//             }
//           ]
//         },
//         {
//           value: '晋中市', label: '晋中市',
//           children: [
//             {
//               value: '', label: '榆次区',
//               value: '', label: '榆社县',
//               value: '', label: '左权县',
//               value: '', label: '和顺县',
//               value: '', label: '昔阳县',
//               value: '', label: '寿阳县',
//               value: '', label: '太谷县',
//               value: '', label: '祁县',
//               value: '', label: '平遥县',
//               value: '', label: '灵石县',
//               value: '', label: '介休市'
//             }
//           ]
//         },
//         {
//           value: '运城市', label: '运城市',
//           children: [
//             {
//               value: '', label: '盐湖区',
//               value: '', label: '临猗县',
//               value: '', label: '万荣县',
//               value: '', label: '闻喜县',
//               value: '', label: '稷山县',
//               value: '', label: '新绛县',
//               value: '', label: '绛县',
//               value: '', label: '垣曲县',
//               value: '', label: '夏县',
//               value: '', label: '平陆县',
//               value: '', label: '芮城县',
//               value: '', label: '永济市',
//               value: '', label: '河津市'
//             }
//           ]
//         },
//         {
//           value: '忻州市', label: '忻州市',
//           children: [
//             {
//               value: '', label: '忻府区',
//               value: '', label: '定襄县',
//               value: '', label: '五台县',
//               value: '', label: '代县',
//               value: '', label: '繁峙县',
//               value: '', label: '宁武县',
//               value: '', label: '静乐县',
//               value: '', label: '神池县',
//               value: '', label: '五寨县',
//               value: '', label: '岢岚县',
//               value: '', label: '河曲县',
//               value: '', label: '保德县',
//               value: '', label: '偏关县',
//               value: '', label: '原平市'
//             }
//           ]
//         },
//         {
//           value: '临汾市', label: '临汾市',
//           children: [
//             {
//               value: '', label: '尧都区',
//               value: '', label: '曲沃县',
//               value: '', label: '翼城县',
//               value: '', label: '襄汾县',
//               value: '', label: '洪洞县',
//               value: '', label: '古县',
//               value: '', label: '安泽县',
//               value: '', label: '浮山县',
//               value: '', label: '吉县',
//               value: '', label: '乡宁县',
//               value: '', label: '大宁县',
//               value: '', label: '隰县',
//               value: '', label: '永和县',
//               value: '', label: '蒲县',
//               value: '', label: '汾西县',
//               value: '', label: '侯马市',
//               value: '', label: '霍州市'
//             }
//           ]
//         },
//         {
//           value: '吕梁市', label: '吕梁市',
//           children: [
//             {
//               value: '', label: '离石区',
//               value: '', label: '文水县',
//               value: '', label: '交城县',
//               value: '', label: '兴县',
//               value: '', label: '临县',
//               value: '', label: '柳林县',
//               value: '', label: '石楼县',
//               value: '', label: '岚县',
//               value: '', label: '方山县',
//               value: '', label: '中阳县',
//               value: '', label: '交口县',
//               value: '', label: '孝义市',
//               value: '', label: '汾阳市'
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '内蒙古自治区', label: '内蒙古自治区',
//       children: [
//         {
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '辽宁省', label: '辽宁省',
//       children: [
//         {
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '吉林省', label: '吉林省',
//       children: [
//         {
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '黑龙江省', label: '黑龙江省',
//       children: [
//         {
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '上海', label: '上海',
//       children: [
//         {
//           value: '上海', label: '上海',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '江苏省', label: '江苏省',
//       children: [
//         {
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '浙江省', label: '浙江省',
//       children: [
//         {
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '安徽省', label: '安徽省',
//       children: [
//         {
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '福建省', label: '福建省',
//       children: [
//         {
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '江西省', label: '江西省',
//       children: [
//         {
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '山东省', label: '山东省',
//       children: [
//         {
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '河南省', label: '河南省',
//       children: [
//         {
//           value: '郑州市', label: '郑州市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "410102": "中原区",
//     "410103": "二七区",
//     "410104": "管城回族区",
//     "410105": "金水区",
//     "410106": "上街区",
//     "410108": "惠济区",
//     "410122": "中牟县",
//     "410181": "巩义市",
//     "410182": "荥阳市",
//     "410183": "新密市",
//     "410184": "新郑市",
//     "410185": "登封市",
//     "410186": "郑东新区",
//     "410187": "高新区",
//     "410188": "其它区"
//   }
//           ]
//         },{
//           value: '开封市', label: '开封市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "410202": "龙亭区",
//     "410203": "顺河回族区",
//     "410204": "鼓楼区",
//     "410205": "禹王台区",
//     "410211": "金明区",
//     "410221": "杞县",
//     "410222": "通许县",
//     "410223": "尉氏县",
//     "410224": "开封县",
//     "410225": "兰考县",
//     "410226": "其它区"
//   }
//           ]
//         },{
//           value: '洛阳市', label: '洛阳市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "410302": "老城区",
//     "410303": "西工区",
//     "410304": "廛河回族区",
//     "410305": "涧西区",
//     "410306": "吉利区",
//     "410307": "洛龙区",
//     "410322": "孟津县",
//     "410323": "新安县",
//     "410324": "栾川县",
//     "410325": "嵩县",
//     "410326": "汝阳县",
//     "410327": "宜阳县",
//     "410328": "洛宁县",
//     "410329": "伊川县",
//     "410381": "偃师市",
//     "471004": "高新区",
//     "471005": "其它区"
//   }
//           ]
//         },{
//           value: '平顶山市', label: '平顶山市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "410402": "新华区",
//     "410403": "卫东区",
//     "410404": "石龙区",
//     "410411": "湛河区",
//     "410421": "宝丰县",
//     "410422": "叶县",
//     "410423": "鲁山县",
//     "410425": "郏县",
//     "410481": "舞钢市",
//     "410482": "汝州市",
//     "410483": "其它区"
//   }
//           ]
//         },{
//           value: '安阳市', label: '安阳市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "410502": "文峰区",
//     "410503": "北关区",
//     "410505": "殷都区",
//     "410506": "龙安区",
//     "410522": "安阳县",
//     "410523": "汤阴县",
//     "410526": "滑县",
//     "410527": "内黄县",
//     "410581": "林州市",
//     "410582": "其它区"
//   }
//           ]
//         },{
//           value: '鹤壁市', label: '鹤壁市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "410602": "鹤山区",
//     "410603": "山城区",
//     "410611": "淇滨区",
//     "410621": "浚县",
//     "410622": "淇县",
//     "410623": "其它区"
//   }
//           ]
//         },{
//           value: '新乡市', label: '新乡市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "410702": "红旗区",
//     "410703": "卫滨区",
//     "410704": "凤泉区",
//     "410711": "牧野区",
//     "410721": "新乡县",
//     "410724": "获嘉县",
//     "410725": "原阳县",
//     "410726": "延津县",
//     "410727": "封丘县",
//     "410728": "长垣县",
//     "410781": "卫辉市",
//     "410782": "辉县市",
//     "410783": "其它区"
//   }
//           ]
//         },{
//           value: '焦作市', label: '焦作市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "410802": "解放区",
//     "410803": "中站区",
//     "410804": "马村区",
//     "410811": "山阳区",
//     "410821": "修武县",
//     "410822": "博爱县",
//     "410823": "武陟县",
//     "410825": "温县",
//     "410882": "沁阳市",
//     "410883": "孟州市",
//     "410884": "其它区"
//   }
//           ]
//         },{
//           value: '济源市', label: '济源市'
//         },{
//           value: '濮阳市', label: '濮阳市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "410902": "华龙区",
//     "410922": "清丰县",
//     "410923": "南乐县",
//     "410926": "范县",
//     "410927": "台前县",
//     "410928": "濮阳县",
//     "410929": "其它区"
//   }
//           ]
//         },{
//           value: '许昌市', label: '许昌市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "411002": "魏都区",
//     "411023": "许昌县",
//     "411024": "鄢陵县",
//     "411025": "襄城县",
//     "411081": "禹州市",
//     "411082": "长葛市",
//     "411083": "其它区"
//   }
//           ]
//         },{
//           value: '漯河市', label: '漯河市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "411102": "源汇区",
//     "411103": "郾城区",
//     "411104": "召陵区",
//     "411121": "舞阳县",
//     "411122": "临颍县",
//     "411123": "其它区"
//   }
//           ]
//         },{
//           value: '三门峡市', label: '三门峡市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "411202": "湖滨区",
//     "411221": "渑池县",
//     "411222": "陕县",
//     "411224": "卢氏县",
//     "411281": "义马市",
//     "411282": "灵宝市",
//     "411283": "其它区"
//   }
//           ]
//         },{
//           value: '南阳市', label: '南阳市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "411302": "宛城区",
//     "411303": "卧龙区",
//     "411321": "南召县",
//     "411322": "方城县",
//     "411323": "西峡县",
//     "411324": "镇平县",
//     "411325": "内乡县",
//     "411326": "淅川县",
//     "411327": "社旗县",
//     "411328": "唐河县",
//     "411329": "新野县",
//     "411330": "桐柏县",
//     "411381": "邓州市",
//     "411382": "其它区"
//   }
//           ]
//         },{
//           value: '商丘市', label: '商丘市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "411402": "梁园区",
//     "411403": "睢阳区",
//     "411421": "民权县",
//     "411422": "睢县",
//     "411423": "宁陵县",
//     "411424": "柘城县",
//     "411425": "虞城县",
//     "411426": "夏邑县",
//     "411481": "永城市",
//     "411482": "其它区"
//   }
//           ]
//         },{
//           value: '信阳市', label: '信阳市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "411502": "浉河区",
//     "411503": "平桥区",
//     "411521": "罗山县",
//     "411522": "光山县",
//     "411523": "新县",
//     "411524": "商城县",
//     "411525": "固始县",
//     "411526": "潢川县",
//     "411527": "淮滨县",
//     "411528": "息县",
//     "411529": "其它区"
//   }
//           ]
//         },{
//           value: '周口市', label: '周口市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "411602": "川汇区",
//     "411621": "扶沟县",
//     "411622": "西华县",
//     "411623": "商水县",
//     "411624": "沈丘县",
//     "411625": "郸城县",
//     "411626": "淮阳县",
//     "411627": "太康县",
//     "411628": "鹿邑县",
//     "411681": "项城市",
//     "411682": "其它区"
//   }
//           ]
//         },{
//           value: '驻马店市', label: '驻马店市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "411702": "驿城区",
//     "411721": "西平县",
//     "411722": "上蔡县",
//     "411723": "平舆县",
//     "411724": "正阳县",
//     "411725": "确山县",
//     "411726": "泌阳县",
//     "411727": "汝南县",
//     "411728": "遂平县",
//     "411729": "新蔡县",
//     "411730": "其它区"
//   }
//           ]
//         }
//       ]
//     },
//     {
//       value: '湖北省', label: '湖北省',
//       children: [
//         {
//           value: '武汉市', label: '武汉市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "420102": "江岸区",
//     "420103": "江汉区",
//     "420104": "硚口区",
//     "420105": "汉阳区",
//     "420106": "武昌区",
//     "420107": "青山区",
//     "420111": "洪山区",
//     "420112": "东西湖区",
//     "420113": "汉南区",
//     "420114": "蔡甸区",
//     "420115": "江夏区",
//     "420116": "黄陂区",
//     "420117": "新洲区",
//     "420118": "其它区"
//   }
//           ]
//         },{
//           value: '黄石市', label: '黄石市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "420202": "黄石港区",
//     "420203": "西塞山区",
//     "420204": "下陆区",
//     "420205": "铁山区",
//     "420222": "阳新县",
//     "420281": "大冶市",
//     "420282": "其它区"
//   }
//           ]
//         },{
//           value: '十堰市', label: '十堰市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "420302": "茅箭区",
//     "420303": "张湾区",
//     "420321": "郧县",
//     "420322": "郧西县",
//     "420323": "竹山县",
//     "420324": "竹溪县",
//     "420325": "房县",
//     "420381": "丹江口市",
//     "420382": "城区",
//     "420383": "其它区"
//   }
//           ]
//         },{
//           value: '宜昌市', label: '宜昌市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "420502": "西陵区",
//     "420503": "伍家岗区",
//     "420504": "点军区",
//     "420505": "猇亭区",
//     "420506": "夷陵区",
//     "420525": "远安县",
//     "420526": "兴山县",
//     "420527": "秭归县",
//     "420528": "长阳土家族自治县",
//     "420529": "五峰土家族自治县",
//     "420551": "葛洲坝区",
//     "420552": "开发区",
//     "420581": "宜都市",
//     "420582": "当阳市",
//     "420583": "枝江市",
//     "420584": "其它区"
//   }
//           ]
//         },{
//           value: '襄阳市', label: '襄阳市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "420602": "襄城区",
//     "420606": "樊城区",
//     "420607": "襄州区",
//     "420624": "南漳县",
//     "420625": "谷城县",
//     "420626": "保康县",
//     "420682": "老河口市",
//     "420683": "枣阳市",
//     "420684": "宜城市",
//     "420685": "其它区"
//   }
//           ]
//         },{
//           value: '鄂州市', label: '鄂州市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "420702": "梁子湖区",
//     "420703": "华容区",
//     "420704": "鄂城区",
//     "420705": "其它区"
//   }
//           ]
//         },{
//           value: '荆门市', label: '荆门市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "420802": "东宝区",
//     "420804": "掇刀区",
//     "420821": "京山县",
//     "420822": "沙洋县",
//     "420881": "钟祥市",
//     "420882": "其它区"
//   }
//           ]
//         },{
//           value: '孝感市', label: '孝感市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "420902": "孝南区",
//     "420921": "孝昌县",
//     "420922": "大悟县",
//     "420923": "云梦县",
//     "420981": "应城市",
//     "420982": "安陆市",
//     "420984": "汉川市",
//     "420985": "其它区"
//   }
//           ]
//         },{
//           value: '荆州市', label: '荆州市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "421002": "沙市区",
//     "421003": "荆州区",
//     "421022": "公安县",
//     "421023": "监利县",
//     "421024": "江陵县",
//     "421081": "石首市",
//     "421083": "洪湖市",
//     "421087": "松滋市",
//     "421088": "其它区"
//   }
//           ]
//         },{
//           value: '黄冈市', label: '黄冈市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "421102": "黄州区",
//     "421121": "团风县",
//     "421122": "红安县",
//     "421123": "罗田县",
//     "421124": "英山县",
//     "421125": "浠水县",
//     "421126": "蕲春县",
//     "421127": "黄梅县",
//     "421181": "麻城市",
//     "421182": "武穴市",
//     "421183": "其它区"
//   }
//           ]
//         },{
//           value: '咸宁市', label: '咸宁市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "421202": "咸安区",
//     "421221": "嘉鱼县",
//     "421222": "通城县",
//     "421223": "崇阳县",
//     "421224": "通山县",
//     "421281": "赤壁市",
//     "421282": "温泉城区",
//     "421283": "其它区"
//   }
//           ]
//         },{
//           value: '随州市', label: '随州市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "421302": "曾都区",
//     "421321": "随县",
//     "421381": "广水市",
//     "421382": "其它区"
//   }
//           ]
//         },{
//           value: '恩施土家族苗族自治州', label: '恩施土家族苗族自治州',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "422801": "恩施市",
//     "422802": "利川市",
//     "422822": "建始县",
//     "422823": "巴东县",
//     "422825": "宣恩县",
//     "422826": "咸丰县",
//     "422827": "来凤县",
//     "422828": "鹤峰县",
//     "422829": "其它区"
//   }
//           ]
//         },{
//           value: '仙桃市', label: '仙桃市'
//         },{
//           value: '潜江市', label: '潜江市'
//         },{
//           value: '天门市', label: '天门市'
//         },{
//           value: '神农架林区', label: '神农架林区'
//         }
//       ]
//     },
//     {
//       value: '湖南省', label: '湖南省',
//       children: [
//         {
//           value: '长沙市', label: '长沙市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "430102": "芙蓉区",
//     "430103": "天心区",
//     "430104": "岳麓区",
//     "430105": "开福区",
//     "430111": "雨花区",
//     "430121": "长沙县",
//     "430122": "望城县",
//     "430124": "宁乡县",
//     "430181": "浏阳市",
//     "430182": "其它区"
//   }
//           ]
//         },
//         {
//           value: '株洲市', label: '株洲市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "430202": "荷塘区",
//     "430203": "芦淞区",
//     "430204": "石峰区",
//     "430211": "天元区",
//     "430221": "株洲县",
//     "430223": "攸县",
//     "430224": "茶陵县",
//     "430225": "炎陵县",
//     "430281": "醴陵市",
//     "430282": "其它区"
//   }
//           ]
//         },{
//           value: '湘潭市', label: '湘潭市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "430302": "雨湖区",
//     "430304": "岳塘区",
//     "430321": "湘潭县",
//     "430381": "湘乡市",
//     "430382": "韶山市",
//     "430383": "其它区"
//   }
//           ]
//         },{
//           value: '衡阳市', label: '衡阳市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "430405": "珠晖区",
//     "430406": "雁峰区",
//     "430407": "石鼓区",
//     "430408": "蒸湘区",
//     "430412": "南岳区",
//     "430421": "衡阳县",
//     "430422": "衡南县",
//     "430423": "衡山县",
//     "430424": "衡东县",
//     "430426": "祁东县",
//     "430481": "耒阳市",
//     "430482": "常宁市",
//     "430483": "其它区"
//   }
//           ]
//         },{
//           value: '邵阳市', label: '邵阳市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "430502": "双清区",
//     "430503": "大祥区",
//     "430511": "北塔区",
//     "430521": "邵东县",
//     "430522": "新邵县",
//     "430523": "邵阳县",
//     "430524": "隆回县",
//     "430525": "洞口县",
//     "430527": "绥宁县",
//     "430528": "新宁县",
//     "430529": "城步苗族自治县",
//     "430581": "武冈市",
//     "430582": "其它区"
//   }
//           ]
//         },{
//           value: '岳阳市', label: '岳阳市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "430602": "岳阳楼区",
//     "430603": "云溪区",
//     "430611": "君山区",
//     "430621": "岳阳县",
//     "430623": "华容县",
//     "430624": "湘阴县",
//     "430626": "平江县",
//     "430681": "汨罗市",
//     "430682": "临湘市",
//     "430683": "其它区"
//   }
//           ]
//         },{
//           value: '常德市', label: '常德市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "430702": "武陵区",
//     "430703": "鼎城区",
//     "430721": "安乡县",
//     "430722": "汉寿县",
//     "430723": "澧县",
//     "430724": "临澧县",
//     "430725": "桃源县",
//     "430726": "石门县",
//     "430781": "津市市",
//     "430782": "其它区"
//   }
//           ]
//         },{
//           value: '张家界市', label: '张家界市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "430802": "永定区",
//     "430811": "武陵源区",
//     "430821": "慈利县",
//     "430822": "桑植县",
//     "430823": "其它区"
//   }
//           ]
//         },{
//           value: '益阳市', label: '益阳市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "430902": "资阳区",
//     "430903": "赫山区",
//     "430921": "南县",
//     "430922": "桃江县",
//     "430923": "安化县",
//     "430981": "沅江市",
//     "430982": "其它区"
//   }
//           ]
//         },{
//           value: '郴州市', label: '郴州市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "431002": "北湖区",
//     "431003": "苏仙区",
//     "431021": "桂阳县",
//     "431022": "宜章县",
//     "431023": "永兴县",
//     "431024": "嘉禾县",
//     "431025": "临武县",
//     "431026": "汝城县",
//     "431027": "桂东县",
//     "431028": "安仁县",
//     "431081": "资兴市",
//     "431082": "其它区"
//   }
//           ]
//         },{
//           value: '永州市', label: '永州市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "431102": "零陵区",
//     "431103": "冷水滩区",
//     "431121": "祁阳县",
//     "431122": "东安县",
//     "431123": "双牌县",
//     "431124": "道县",
//     "431125": "江永县",
//     "431126": "宁远县",
//     "431127": "蓝山县",
//     "431128": "新田县",
//     "431129": "江华瑶族自治县",
//     "431130": "其它区"
//   }
//           ]
//         },{
//           value: '怀化市', label: '怀化市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "431202": "鹤城区",
//     "431221": "中方县",
//     "431222": "沅陵县",
//     "431223": "辰溪县",
//     "431224": "溆浦县",
//     "431225": "会同县",
//     "431226": "麻阳苗族自治县",
//     "431227": "新晃侗族自治县",
//     "431228": "芷江侗族自治县",
//     "431229": "靖州苗族侗族自治县",
//     "431230": "通道侗族自治县",
//     "431281": "洪江市",
//     "431282": "其它区"
//   }
//           ]
//         },{
//           value: '娄底市', label: '娄底市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "431302": "娄星区",
//     "431321": "双峰县",
//     "431322": "新化县",
//     "431381": "冷水江市",
//     "431382": "涟源市",
//     "431383": "其它区"
//   }
//           ]
//         },{
//           value: '湘西土家族苗族自治州', label: '湘西土家族苗族自治州',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "433101": "吉首市",
//     "433122": "泸溪县",
//     "433123": "凤凰县",
//     "433124": "花垣县",
//     "433125": "保靖县",
//     "433126": "古丈县",
//     "433127": "永顺县",
//     "433130": "龙山县",
//     "433131": "其它区"
//   }
//           ]
//         }
//       ]
//     },
//     {
//       value: '广东省', label: '广东省',
//       children: [
//         {
//           value: '广州市', label: '广州市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "440103": "荔湾区",
//     "440104": "越秀区",
//     "440105": "海珠区",
//     "440106": "天河区",
//     "440111": "白云区",
//     "440112": "黄埔区",
//     "440113": "番禺区",
//     "440114": "花都区",
//     "440115": "南沙区",
//     "440116": "萝岗区",
//     "440183": "增城市",
//     "440184": "从化市",
//     "440188": "东山区",
//     "440189": "其它区"
//   }
//           ]
//         },
//         {
//           value: '韶关市', label: '韶关市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "440203": "武江区",
//     "440204": "浈江区",
//     "440205": "曲江区",
//     "440222": "始兴县",
//     "440224": "仁化县",
//     "440229": "翁源县",
//     "440232": "乳源瑶族自治县",
//     "440233": "新丰县",
//     "440281": "乐昌市",
//     "440282": "南雄市",
//     "440283": "其它区"
//   }
//           ]
//         },{
//           value: '深圳市', label: '深圳市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "1032697": "光明新区",
//     "1032698": "坪山新区",
//     "1032699": "大鹏新区",
//     "1032700": "龙华新区",
//     "440303": "罗湖区",
//     "440304": "福田区",
//     "440305": "南山区",
//     "440306": "宝安区",
//     "440307": "龙岗区",
//     "440308": "盐田区",
//     "440309": "其它区"
//   }
//           ]
//         },{
//           value: '珠海市', label: '珠海市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "440402": "香洲区",
//     "440403": "斗门区",
//     "440404": "金湾区",
//     "440486": "金唐区",
//     "440487": "南湾区",
//     "440488": "其它区"
//   }
//           ]
//         },{
//           value: '汕头市', label: '汕头市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "440507": "龙湖区",
//     "440511": "金平区",
//     "440512": "濠江区",
//     "440513": "潮阳区",
//     "440514": "潮南区",
//     "440515": "澄海区",
//     "440523": "南澳县",
//     "440524": "其它区"
//   }
//           ]
//         },{
//           value: '佛山市', label: '佛山市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "440604": "禅城区",
//     "440605": "南海区",
//     "440606": "顺德区",
//     "440607": "三水区",
//     "440608": "高明区",
//     "440609": "其它区"
//   }
//           ]
//         },{
//           value: '江门市', label: '江门市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "440703": "蓬江区",
//     "440704": "江海区",
//     "440705": "新会区",
//     "440781": "台山市",
//     "440783": "开平市",
//     "440784": "鹤山市",
//     "440785": "恩平市",
//     "440786": "其它区"
//   }
//           ]
//         },{
//           value: '湛江市', label: '湛江市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "440802": "赤坎区",
//     "440803": "霞山区",
//     "440804": "坡头区",
//     "440811": "麻章区",
//     "440823": "遂溪县",
//     "440825": "徐闻县",
//     "440881": "廉江市",
//     "440882": "雷州市",
//     "440883": "吴川市",
//     "440884": "其它区"
//   }
//           ]
//         },{
//           value: '茂名市', label: '茂名市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "440902": "茂南区",
//     "440903": "茂港区",
//     "440923": "电白县",
//     "440981": "高州市",
//     "440982": "化州市",
//     "440983": "信宜市",
//     "440984": "其它区"
//   }
//           ]
//         },{
//           value: '肇庆市', label: '肇庆市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "441202": "端州区",
//     "441203": "鼎湖区",
//     "441223": "广宁县",
//     "441224": "怀集县",
//     "441225": "封开县",
//     "441226": "德庆县",
//     "441283": "高要市",
//     "441284": "四会市",
//     "441285": "其它区"
//   }
//           ]
//         },{
//           value: '惠州市', label: '惠州市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "441302": "惠城区",
//     "441303": "惠阳区",
//     "441322": "博罗县",
//     "441323": "惠东县",
//     "441324": "龙门县",
//     "441325": "其它区"
//   }
//           ]
//         },{
//           value: '梅州市', label: '梅州市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "441402": "梅江区",
//     "441421": "梅县",
//     "441422": "大埔县",
//     "441423": "丰顺县",
//     "441424": "五华县",
//     "441426": "平远县",
//     "441427": "蕉岭县",
//     "441481": "兴宁市",
//     "441482": "其它区"
//   }
//           ]
//         },{
//           value: '汕尾市', label: '汕尾市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "441502": "城区",
//     "441521": "海丰县",
//     "441523": "陆河县",
//     "441581": "陆丰市",
//     "441582": "其它区"
//   }
//           ]
//         },{
//           value: '河源市', label: '河源市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "441602": "源城区",
//     "441621": "紫金县",
//     "441622": "龙川县",
//     "441623": "连平县",
//     "441624": "和平县",
//     "441625": "东源县",
//     "441626": "其它区"
//   }
//           ]
//         },{
//           value: '阳江市', label: '阳江市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "441702": "江城区",
//     "441721": "阳西县",
//     "441723": "阳东县",
//     "441781": "阳春市",
//     "441782": "其它区"
//   }
//           ]
//         },{
//           value: '清远市', label: '清远市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "441802": "清城区",
//     "441821": "佛冈县",
//     "441823": "阳山县",
//     "441825": "连山壮族瑶族自治县",
//     "441826": "连南瑶族自治县",
//     "441827": "清新县",
//     "441881": "英德市",
//     "441882": "连州市",
//     "441883": "其它区"
//   }
//           ]
//         },{
//           value: '东莞市', label: '东莞市'
//         },{
//           value: '中山市', label: '中山市'
//         },{
//           value: '潮州市', label: '潮州市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "445102": "湘桥区",
//     "445121": "潮安县",
//     "445122": "饶平县",
//     "445185": "枫溪区",
//     "445186": "其它区"
//   }
//           ]
//         },{
//           value: '揭阳市', label: '揭阳市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "445202": "榕城区",
//     "445221": "揭东县",
//     "445222": "揭西县",
//     "445224": "惠来县",
//     "445281": "普宁市",
//     "445284": "东山区",
//     "445285": "其它区"
//   }
//           ]
//         },{
//           value: '云浮市', label: '云浮市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "445302": "云城区",
//     "445321": "新兴县",
//     "445322": "郁南县",
//     "445323": "云安县",
//     "445381": "罗定市",
//     "445382": "其它区"
//   }
//           ]
//         }
//       ]
//     },
//     {
//       value: '广西壮族自治区', label: '广西壮族自治区',
//       children: [
//         {
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "450102": "兴宁区",
//     "450103": "青秀区",
//     "450105": "江南区",
//     "450107": "西乡塘区",
//     "450108": "良庆区",
//     "450109": "邕宁区",
//     "450122": "武鸣县",
//     "450123": "隆安县",
//     "450124": "马山县",
//     "450125": "上林县",
//     "450126": "宾阳县",
//     "450127": "横县",
//     "450128": "其它区"
//   }
//           ]
//         },
//         {
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "450202": "城中区",
//     "450203": "鱼峰区",
//     "450204": "柳南区",
//     "450205": "柳北区",
//     "450221": "柳江县",
//     "450222": "柳城县",
//     "450223": "鹿寨县",
//     "450224": "融安县",
//     "450225": "融水苗族自治县",
//     "450226": "三江侗族自治县",
//     "450227": "其它区"
//   }
//           ]
//         },{
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "450302": "秀峰区",
//     "450303": "叠彩区",
//     "450304": "象山区",
//     "450305": "七星区",
//     "450311": "雁山区",
//     "450321": "阳朔县",
//     "450322": "临桂县",
//     "450323": "灵川县",
//     "450324": "全州县",
//     "450325": "兴安县",
//     "450326": "永福县",
//     "450327": "灌阳县",
//     "450328": "龙胜各族自治县",
//     "450329": "资源县",
//     "450330": "平乐县",
//     "450331": "荔浦县",
//     "450332": "恭城瑶族自治县",
//     "450333": "其它区"
//   }
//           ]
//         },{
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "450403": "万秀区",
//     "450404": "蝶山区",
//     "450405": "长洲区",
//     "450421": "苍梧县",
//     "450422": "藤县",
//     "450423": "蒙山县",
//     "450481": "岑溪市",
//     "450482": "其它区"
//   }
//           ]
//         },{
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "450502": "海城区",
//     "450503": "银海区",
//     "450512": "铁山港区",
//     "450521": "合浦县",
//     "450522": "其它区"
//   }
//           ]
//         },{
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "450602": "港口区",
//     "450603": "防城区",
//     "450621": "上思县",
//     "450681": "东兴市",
//     "450682": "其它区"
//   }
//           ]
//         },{
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "450702": "钦南区",
//     "450703": "钦北区",
//     "450721": "灵山县",
//     "450722": "浦北县",
//     "450723": "其它区"
//   }
//           ]
//         },{
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "450802": "港北区",
//     "450803": "港南区",
//     "450804": "覃塘区",
//     "450821": "平南县",
//     "450881": "桂平市",
//     "450882": "其它区"
//   }
//           ]
//         },{
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "450902": "玉州区",
//     "450921": "容县",
//     "450922": "陆川县",
//     "450923": "博白县",
//     "450924": "兴业县",
//     "450981": "北流市",
//     "450982": "其它区"
//   }
//           ]
//         },{
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "451002": "右江区",
//     "451021": "田阳县",
//     "451022": "田东县",
//     "451023": "平果县",
//     "451024": "德保县",
//     "451025": "靖西县",
//     "451026": "那坡县",
//     "451027": "凌云县",
//     "451028": "乐业县",
//     "451029": "田林县",
//     "451030": "西林县",
//     "451031": "隆林各族自治县",
//     "451032": "其它区"
//   }
//           ]
//         },{
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "451102": "八步区",
//     "451121": "昭平县",
//     "451122": "钟山县",
//     "451123": "富川瑶族自治县",
//     "451124": "其它区"
//   }
//           ]
//         },{
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "451202": "金城江区",
//     "451221": "南丹县",
//     "451222": "天峨县",
//     "451223": "凤山县",
//     "451224": "东兰县",
//     "451225": "罗城仫佬族自治县",
//     "451226": "环江毛南族自治县",
//     "451227": "巴马瑶族自治县",
//     "451228": "都安瑶族自治县",
//     "451229": "大化瑶族自治县",
//     "451281": "宜州市",
//     "451282": "其它区"
//   }
//           ]
//         },{
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "451302": "兴宾区",
//     "451321": "忻城县",
//     "451322": "象州县",
//     "451323": "武宣县",
//     "451324": "金秀瑶族自治县",
//     "451381": "合山市",
//     "451382": "其它区"
//   }
//           ]
//         },{
//           value: '', label: '',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "451402": "江洲区",
//     "451421": "扶绥县",
//     "451422": "宁明县",
//     "451423": "龙州县",
//     "451424": "大新县",
//     "451425": "天等县",
//     "451481": "凭祥市",
//     "451482": "其它区"
//   }
//           ]
//         }
//       ]
//     },
//     {
//       value: '海南省', label: '海南省',
//       children: [
//         {
//           value: '海口市', label: '海口市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "460105": "秀英区",
//     "460106": "龙华区",
//     "460107": "琼山区",
//     "460108": "美兰区",
//     "460109": "其它区"
//   }
//           ]
//         },
//         {
//           value: '三亚市', label: '三亚市'
//         },
//         {
//           value: '五指山市', label: '五指山市'
//         },
//         {
//           value: '琼海市', label: '琼海市'
//         },
//         {
//           value: '儋州市', label: '儋州市'
//         },
//         {
//           value: '文昌市', label: '文昌市'
//         },
//         {
//           value: '万宁市', label: '万宁市'
//         },
//         {
//           value: '东方市', label: '东方市'
//         },
//         {
//           value: '定安县', label: '定安县'
//         },
//         {
//           value: '屯昌县', label: '屯昌县'
//         },
//         {
//           value: '澄迈县', label: '澄迈县'
//         },
//         {
//           value: '临高县', label: '临高县'
//         },
//         {
//           value: '白沙黎族自治县', label: '白沙黎族自治县'
//         },
//         {
//           value: '昌江黎族自治县', label: '昌江黎族自治县'
//         },
//         {
//           value: '乐东黎族自治县', label: '乐东黎族自治县'
//         },
//         {
//           value: '陵水黎族自治县', label: '陵水黎族自治县'
//         },
//         {
//           value: '保亭黎族苗族自治县', label: '保亭黎族苗族自治县'
//         },
//         {
//           value: '琼中黎族苗族自治县', label: '琼中黎族苗族自治县'
//         },
//         {
//           value: '西沙群岛', label: '西沙群岛'
//         },
//         {
//           value: '南沙群岛', label: '南沙群岛'
//         },
//         {
//           value: '中沙群岛的岛礁及其海域', label: '中沙群岛的岛礁及其海域'
//         }
//       ]
//     },
//     {
//       value: '重庆', label: '重庆',
//       children: [
//         {
//           value: '重庆市', label: '重庆市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "500101": "万州区",
//     "500102": "涪陵区",
//     "500103": "渝中区",
//     "500104": "大渡口区",
//     "500105": "江北区",
//     "500106": "沙坪坝区",
//     "500107": "九龙坡区",
//     "500108": "南岸区",
//     "500109": "北碚区",
//     "500110": "万盛区",
//     "500111": "双桥区",
//     "500112": "渝北区",
//     "500113": "巴南区",
//     "500114": "黔江区",
//     "500115": "长寿区",
//     "500222": "綦江县",
//     "500223": "潼南县",
//     "500224": "铜梁县",
//     "500225": "大足县",
//     "500226": "荣昌县",
//     "500227": "璧山县",
//     "500228": "梁平县",
//     "500229": "城口县",
//     "500230": "丰都县",
//     "500231": "垫江县",
//     "500232": "武隆县",
//     "500233": "忠县",
//     "500234": "开县",
//     "500235": "云阳县",
//     "500236": "奉节县",
//     "500237": "巫山县",
//     "500238": "巫溪县",
//     "500240": "石柱土家族自治县",
//     "500241": "秀山土家族苗族自治县",
//     "500242": "酉阳土家族苗族自治县",
//     "500243": "彭水苗族土家族自治县",
//     "500381": "江津区",
//     "500382": "合川区",
//     "500383": "永川区",
//     "500384": "南川区",
//     "500385": "其它区"
//   }
//           ]
//         }
//       ]
//     },
//     {
//       value: '四川省', label: '四川省',
//       children: [
//         {
//           value: '成都市', label: '成都市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "510104": "锦江区",
//     "510105": "青羊区",
//     "510106": "金牛区",
//     "510107": "武侯区",
//     "510108": "成华区",
//     "510112": "龙泉驿区",
//     "510113": "青白江区",
//     "510114": "新都区",
//     "510115": "温江区",
//     "510121": "金堂县",
//     "510122": "双流县",
//     "510124": "郫县",
//     "510129": "大邑县",
//     "510131": "蒲江县",
//     "510132": "新津县",
//     "510181": "都江堰市",
//     "510182": "彭州市",
//     "510183": "邛崃市",
//     "510184": "崇州市",
//     "510185": "其它区"
//   }
//           ]
//         },
//         {
//           value: '自贡市', label: '自贡市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "510302": "自流井区",
//     "510303": "贡井区",
//     "510304": "大安区",
//     "510311": "沿滩区",
//     "510321": "荣县",
//     "510322": "富顺县",
//     "510323": "其它区"
//   }
//           ]
//         },
//         {
//           value: '攀枝花市', label: '攀枝花市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "510402": "东区",
//     "510403": "西区",
//     "510411": "仁和区",
//     "510421": "米易县",
//     "510422": "盐边县",
//     "510423": "其它区"
//   }
//           ]
//         },
//         {
//           value: '泸州市', label: '泸州市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "510502": "江阳区",
//     "510503": "纳溪区",
//     "510504": "龙马潭区",
//     "510521": "泸县",
//     "510522": "合江县",
//     "510524": "叙永县",
//     "510525": "古蔺县",
//     "510526": "其它区"
//   }
//           ]
//         },
//         {
//           value: '德阳市', label: '德阳市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "510603": "旌阳区",
//     "510623": "中江县",
//     "510626": "罗江县",
//     "510681": "广汉市",
//     "510682": "什邡市",
//     "510683": "绵竹市",
//     "510684": "其它区"
//   }
//           ]
//         },
//         {
//           value: '绵阳市', label: '绵阳市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "510703": "涪城区",
//     "510704": "游仙区",
//     "510722": "三台县",
//     "510723": "盐亭县",
//     "510724": "安县",
//     "510725": "梓潼县",
//     "510726": "北川羌族自治县",
//     "510727": "平武县",
//     "510751": "高新区",
//     "510781": "江油市",
//     "510782": "其它区"
//   }
//           ]
//         },
//         {
//           value: '广元市', label: '广元市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "510802": "利州区",
//     "510811": "元坝区",
//     "510812": "朝天区",
//     "510821": "旺苍县",
//     "510822": "青川县",
//     "510823": "剑阁县",
//     "510824": "苍溪县",
//     "510825": "其它区"
//   }
//           ]
//         },
//         {
//           value: '遂宁市', label: '遂宁市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "510903": "船山区",
//     "510904": "安居区",
//     "510921": "蓬溪县",
//     "510922": "射洪县",
//     "510923": "大英县",
//     "510924": "其它区"
//   }
//           ]
//         },
//         {
//           value: '内江市', label: '内江市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "511002": "市中区",
//     "511011": "东兴区",
//     "511024": "威远县",
//     "511025": "资中县",
//     "511028": "隆昌县",
//     "511029": "其它区"
//   }
//           ]
//         },
//         {
//           value: '乐山市', label: '乐山市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "511102": "市中区",
//     "511111": "沙湾区",
//     "511112": "五通桥区",
//     "511113": "金口河区",
//     "511123": "犍为县",
//     "511124": "井研县",
//     "511126": "夹江县",
//     "511129": "沐川县",
//     "511132": "峨边彝族自治县",
//     "511133": "马边彝族自治县",
//     "511181": "峨眉山市",
//     "511182": "其它区"
//   }
//           ]
//         },
//         {
//           value: '南充市', label: '南充市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "511302": "顺庆区",
//     "511303": "高坪区",
//     "511304": "嘉陵区",
//     "511321": "南部县",
//     "511322": "营山县",
//     "511323": "蓬安县",
//     "511324": "仪陇县",
//     "511325": "西充县",
//     "511381": "阆中市",
//     "511382": "其它区"
//   }
//           ]
//         },
//         {
//           value: '眉山市', label: '眉山市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "511402": "东坡区",
//     "511421": "仁寿县",
//     "511422": "彭山县",
//     "511423": "洪雅县",
//     "511424": "丹棱县",
//     "511425": "青神县",
//     "511426": "其它区"
//   }
//           ]
//         },
//         {
//           value: '宜宾市', label: '宜宾市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "511502": "翠屏区",
//     "511521": "宜宾县",
//     "511522": "南溪县",
//     "511523": "江安县",
//     "511524": "长宁县",
//     "511525": "高县",
//     "511526": "珙县",
//     "511527": "筠连县",
//     "511528": "兴文县",
//     "511529": "屏山县",
//     "511530": "其它区"
//   }
//           ]
//         },
//         {
//           value: '广安市', label: '广安市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "511602": "广安区",
//     "511621": "岳池县",
//     "511622": "武胜县",
//     "511623": "邻水县",
//     "511681": "华蓥市",
//     "511682": "市辖区",
//     "511683": "其它区"
//   }
//           ]
//         },
//         {
//           value: '达州市', label: '达州市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "511702": "通川区",
//     "511721": "达县",
//     "511722": "宣汉县",
//     "511723": "开江县",
//     "511724": "大竹县",
//     "511725": "渠县",
//     "511781": "万源市",
//     "511782": "其它区"
//   }
//           ]
//         },
//         {
//           value: '雅安市', label: '雅安市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "511802": "雨城区",
//     "511821": "名山县",
//     "511822": "荥经县",
//     "511823": "汉源县",
//     "511824": "石棉县",
//     "511825": "天全县",
//     "511826": "芦山县",
//     "511827": "宝兴县",
//     "511828": "其它区"
//   }
//           ]
//         },
//         {
//           value: '巴中市', label: '巴中市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "511902": "巴州区",
//     "511921": "通江县",
//     "511922": "南江县",
//     "511923": "平昌县",
//     "511924": "其它区"
//   }
//           ]
//         },
//         {
//           value: '资阳市', label: '资阳市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "512002": "雁江区",
//     "512021": "安岳县",
//     "512022": "乐至县",
//     "512081": "简阳市",
//     "512082": "其它区"
//   }
//           ]
//         },
//         {
//           value: '阿坝藏族羌族自治州', label: '阿坝藏族羌族自治州',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "513221": "汶川县",
//     "513222": "理县",
//     "513223": "茂县",
//     "513224": "松潘县",
//     "513225": "九寨沟县",
//     "513226": "金川县",
//     "513227": "小金县",
//     "513228": "黑水县",
//     "513229": "马尔康县",
//     "513230": "壤塘县",
//     "513231": "阿坝县",
//     "513232": "若尔盖县",
//     "513233": "红原县",
//     "513234": "其它区"
//   }
//           ]
//         },
//         {
//           value: '甘孜藏族自治州', label: '甘孜藏族自治州',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "513321": "康定县",
//     "513322": "泸定县",
//     "513323": "丹巴县",
//     "513324": "九龙县",
//     "513325": "雅江县",
//     "513326": "道孚县",
//     "513327": "炉霍县",
//     "513328": "甘孜县",
//     "513329": "新龙县",
//     "513330": "德格县",
//     "513331": "白玉县",
//     "513332": "石渠县",
//     "513333": "色达县",
//     "513334": "理塘县",
//     "513335": "巴塘县",
//     "513336": "乡城县",
//     "513337": "稻城县",
//     "513338": "得荣县",
//     "513339": "其它区"
//   }
//           ]
//         },
//         {
//           value: '凉山彝族自治州', label: '凉山彝族自治州',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "513401": "西昌市",
//     "513422": "木里藏族自治县",
//     "513423": "盐源县",
//     "513424": "德昌县",
//     "513425": "会理县",
//     "513426": "会东县",
//     "513427": "宁南县",
//     "513428": "普格县",
//     "513429": "布拖县",
//     "513430": "金阳县",
//     "513431": "昭觉县",
//     "513432": "喜德县",
//     "513433": "冕宁县",
//     "513434": "越西县",
//     "513435": "甘洛县",
//     "513436": "美姑县",
//     "513437": "雷波县",
//     "513438": "其它区"
//   }
//           ]
//         }
//       ]
//     },
//     {
//       value: '贵州省', label: '贵州省',
//       children: [
//         {
//           value: '贵阳市', label: '贵阳市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "520102": "南明区",
//     "520103": "云岩区",
//     "520111": "花溪区",
//     "520112": "乌当区",
//     "520113": "白云区",
//     "520114": "小河区",
//     "520121": "开阳县",
//     "520122": "息烽县",
//     "520123": "修文县",
//     "520151": "金阳开发区",
//     "520181": "清镇市",
//     "520182": "其它区"
//   }
//           ]
//         },
//         {
//           value: '六盘水市', label: '六盘水市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "520201": "钟山区",
//     "520203": "六枝特区",
//     "520221": "水城县",
//     "520222": "盘县",
//     "520223": "其它区"
//   }
//           ]
//         },
//         {
//           value: '遵义市', label: '遵义市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "520302": "红花岗区",
//     "520303": "汇川区",
//     "520321": "遵义县",
//     "520322": "桐梓县",
//     "520323": "绥阳县",
//     "520324": "正安县",
//     "520325": "道真仡佬族苗族自治县",
//     "520326": "务川仡佬族苗族自治县",
//     "520327": "凤冈县",
//     "520328": "湄潭县",
//     "520329": "余庆县",
//     "520330": "习水县",
//     "520381": "赤水市",
//     "520382": "仁怀市",
//     "520383": "其它区"
//   }
//           ]
//         },
//         {
//           value: '安顺市', label: '安顺市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "520402": "西秀区",
//     "520421": "平坝县",
//     "520422": "普定县",
//     "520423": "镇宁布依族苗族自治县",
//     "520424": "关岭布依族苗族自治县",
//     "520425": "紫云苗族布依族自治县",
//     "520426": "其它区"
//   }
//           ]
//         },
//         {
//           value: '铜仁地区', label: '铜仁地区',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "522201": "铜仁市",
//     "522222": "江口县",
//     "522223": "玉屏侗族自治县",
//     "522224": "石阡县",
//     "522225": "思南县",
//     "522226": "印江土家族苗族自治县",
//     "522227": "德江县",
//     "522228": "沿河土家族自治县",
//     "522229": "松桃苗族自治县",
//     "522230": "万山特区",
//     "522231": "其它区"
//   }
//           ]
//         },
//         {
//           value: '黔西南布依族苗族自治州', label: '黔西南布依族苗族自治州',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "522301": "兴义市",
//     "522322": "兴仁县",
//     "522323": "普安县",
//     "522324": "晴隆县",
//     "522325": "贞丰县",
//     "522326": "望谟县",
//     "522327": "册亨县",
//     "522328": "安龙县",
//     "522329": "其它区"
//   }
//           ]
//         },
//         {
//           value: '毕节地区', label: '毕节地区',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "522401": "毕节市",
//     "522422": "大方县",
//     "522423": "黔西县",
//     "522424": "金沙县",
//     "522425": "织金县",
//     "522426": "纳雍县",
//     "522427": "威宁彝族回族苗族自治县",
//     "522428": "赫章县",
//     "522429": "其它区"
//   }
//           ]
//         },
//         {
//           value: '黔东南苗族侗族自治州', label: '黔东南苗族侗族自治州',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "522601": "凯里市",
//     "522622": "黄平县",
//     "522623": "施秉县",
//     "522624": "三穗县",
//     "522625": "镇远县",
//     "522626": "岑巩县",
//     "522627": "天柱县",
//     "522628": "锦屏县",
//     "522629": "剑河县",
//     "522630": "台江县",
//     "522631": "黎平县",
//     "522632": "榕江县",
//     "522633": "从江县",
//     "522634": "雷山县",
//     "522635": "麻江县",
//     "522636": "丹寨县",
//     "522637": "其它区"
//   }
//           ]
//         },
//         {
//           value: '黔南布依族苗族自治州', label: '黔南布依族苗族自治州',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "522701": "都匀市",
//     "522702": "福泉市",
//     "522722": "荔波县",
//     "522723": "贵定县",
//     "522725": "瓮安县",
//     "522726": "独山县",
//     "522727": "平塘县",
//     "522728": "罗甸县",
//     "522729": "长顺县",
//     "522730": "龙里县",
//     "522731": "惠水县",
//     "522732": "三都水族自治县",
//     "522733": "其它区"
//   }
//           ]
//         }
//       ]
//     },
//     {
//       value: '云南省', label: '云南省',
//       children: [
//         {
//           value: '昆明市', label: '昆明市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "530102": "五华区",
//     "530103": "盘龙区",
//     "530111": "官渡区",
//     "530112": "西山区",
//     "530113": "东川区",
//     "530121": "呈贡县",
//     "530122": "晋宁县",
//     "530124": "富民县",
//     "530125": "宜良县",
//     "530126": "石林彝族自治县",
//     "530127": "嵩明县",
//     "530128": "禄劝彝族苗族自治县",
//     "530129": "寻甸回族彝族自治县",
//     "530181": "安宁市",
//     "530182": "其它区"
//   }
//           ]
//         },
//         {
//           value: '曲靖市', label: '曲靖市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "530302": "麒麟区",
//     "530321": "马龙县",
//     "530322": "陆良县",
//     "530323": "师宗县",
//     "530324": "罗平县",
//     "530325": "富源县",
//     "530326": "会泽县",
//     "530328": "沾益县",
//     "530381": "宣威市",
//     "530382": "其它区"
//   }
//           ]
//         },
//         {
//           value: '玉溪市', label: '玉溪市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "530402": "红塔区",
//     "530421": "江川县",
//     "530422": "澄江县",
//     "530423": "通海县",
//     "530424": "华宁县",
//     "530425": "易门县",
//     "530426": "峨山彝族自治县",
//     "530427": "新平彝族傣族自治县",
//     "530428": "元江哈尼族彝族傣族自治县",
//     "530429": "其它区"
//   }
//           ]
//         },
//         {
//           value: '保山市', label: '保山市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "530502": "隆阳区",
//     "530521": "施甸县",
//     "530522": "腾冲县",
//     "530523": "龙陵县",
//     "530524": "昌宁县",
//     "530525": "其它区"
//   }
//           ]
//         },
//         {
//           value: '昭通市', label: '昭通市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "530602": "昭阳区",
//     "530621": "鲁甸县",
//     "530622": "巧家县",
//     "530623": "盐津县",
//     "530624": "大关县",
//     "530625": "永善县",
//     "530626": "绥江县",
//     "530627": "镇雄县",
//     "530628": "彝良县",
//     "530629": "威信县",
//     "530630": "水富县",
//     "530631": "其它区"
//   }
//           ]
//         },
//         {
//           value: '丽江市', label: '丽江市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "530702": "古城区",
//     "530721": "玉龙纳西族自治县",
//     "530722": "永胜县",
//     "530723": "华坪县",
//     "530724": "宁蒗彝族自治县",
//     "530725": "其它区"
//   }
//           ]
//         },
//         {
//           value: '普洱市', label: '普洱市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "530802": "思茅区",
//     "530821": "宁洱哈尼族彝族自治县",
//     "530822": "墨江哈尼族自治县",
//     "530823": "景东彝族自治县",
//     "530824": "景谷傣族彝族自治县",
//     "530825": "镇沅彝族哈尼族拉祜族自治县",
//     "530826": "江城哈尼族彝族自治县",
//     "530827": "孟连傣族拉祜族佤族自治县",
//     "530828": "澜沧拉祜族自治县",
//     "530829": "西盟佤族自治县",
//     "530830": "其它区"
//   }
//           ]
//         },
//         {
//           value: '临沧市', label: '临沧市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "530902": "临翔区",
//     "530921": "凤庆县",
//     "530922": "云县",
//     "530923": "永德县",
//     "530924": "镇康县",
//     "530925": "双江拉祜族佤族布朗族傣族自治县",
//     "530926": "耿马傣族佤族自治县",
//     "530927": "沧源佤族自治县",
//     "530928": "其它区"
//   }
//           ]
//         },
//         {
//           value: '楚雄彝族自治州', label: '楚雄彝族自治州',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "532301": "楚雄市",
//     "532322": "双柏县",
//     "532323": "牟定县",
//     "532324": "南华县",
//     "532325": "姚安县",
//     "532326": "大姚县",
//     "532327": "永仁县",
//     "532328": "元谋县",
//     "532329": "武定县",
//     "532331": "禄丰县",
//     "532332": "其它区"
//   }
//           ]
//         },
//         {
//           value: '红河哈尼族彝族自治州', label: '红河哈尼族彝族自治州',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "532501": "个旧市",
//     "532502": "开远市",
//     "532522": "蒙自县",
//     "532523": "屏边苗族自治县",
//     "532524": "建水县",
//     "532525": "石屏县",
//     "532526": "弥勒县",
//     "532527": "泸西县",
//     "532528": "元阳县",
//     "532529": "红河县",
//     "532530": "金平苗族瑶族傣族自治县",
//     "532531": "绿春县",
//     "532532": "河口瑶族自治县",
//     "532533": "其它区"
//   }
//           ]
//         },
//         {
//           value: '文山壮族苗族自治州', label: '文山壮族苗族自治州',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "532621": "文山县",
//     "532622": "砚山县",
//     "532623": "西畴县",
//     "532624": "麻栗坡县",
//     "532625": "马关县",
//     "532626": "丘北县",
//     "532627": "广南县",
//     "532628": "富宁县",
//     "532629": "其它区"
//   }
//           ]
//         },
//         {
//           value: '西双版纳傣族自治州', label: '西双版纳傣族自治州',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "532801": "景洪市",
//     "532822": "勐海县",
//     "532823": "勐腊县",
//     "532824": "其它区"
//   }
//           ]
//         },
//         {
//           value: '大理白族自治州', label: '大理白族自治州',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "532901": "大理市",
//     "532922": "漾濞彝族自治县",
//     "532923": "祥云县",
//     "532924": "宾川县",
//     "532925": "弥渡县",
//     "532926": "南涧彝族自治县",
//     "532927": "巍山彝族回族自治县",
//     "532928": "永平县",
//     "532929": "云龙县",
//     "532930": "洱源县",
//     "532931": "剑川县",
//     "532932": "鹤庆县",
//     "532933": "其它区"
//   }
//           ]
//         },
//         {
//           value: '德宏傣族景颇族自治州', label: '德宏傣族景颇族自治州',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "533102": "瑞丽市",
//     "533103": "潞西市",
//     "533122": "梁河县",
//     "533123": "盈江县",
//     "533124": "陇川县",
//     "533125": "其它区"
//   }
//           ]
//         },
//         {
//           value: '怒江傈僳族自治州', label: '怒江傈僳族自治州',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "533321": "泸水县",
//     "533323": "福贡县",
//     "533324": "贡山独龙族怒族自治县",
//     "533325": "兰坪白族普米族自治县",
//     "533326": "其它区"
//   }
//           ]
//         },
//         {
//           value: '迪庆藏族自治州', label: '迪庆藏族自治州',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "533421": "香格里拉县",
//     "533422": "德钦县",
//     "533423": "维西傈僳族自治县",
//     "533424": "其它区"
//   }
//           ]
//         }
//       ]
//     },
//     {
//       value: '西藏自治区', label: '西藏自治区',
//       children: [
//         {
//           value: '拉萨市', label: '拉萨市',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "540102": "城关区",
//     "540121": "林周县",
//     "540122": "当雄县",
//     "540123": "尼木县",
//     "540124": "曲水县",
//     "540125": "堆龙德庆县",
//     "540126": "达孜县",
//     "540127": "墨竹工卡县",
//     "540128": "其它区"
//   }
//           ]
//         },
//         {
//           value: '昌都地区', label: '昌都地区',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "542121": "昌都县",
//     "542122": "江达县",
//     "542123": "贡觉县",
//     "542124": "类乌齐县",
//     "542125": "丁青县",
//     "542126": "察雅县",
//     "542127": "八宿县",
//     "542128": "左贡县",
//     "542129": "芒康县",
//     "542132": "洛隆县",
//     "542133": "边坝县",
//     "542134": "其它区"
//   }
//           ]
//         },
//         {
//           value: '山南地区', label: '山南地区',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "542221": "乃东县",
//     "542222": "扎囊县",
//     "542223": "贡嘎县",
//     "542224": "桑日县",
//     "542225": "琼结县",
//     "542226": "曲松县",
//     "542227": "措美县",
//     "542228": "洛扎县",
//     "542229": "加查县",
//     "542231": "隆子县",
//     "542232": "错那县",
//     "542233": "浪卡子县",
//     "542234": "其它区"
//   }
//           ]
//         },
//         {
//           value: '日喀则地区', label: '日喀则地区',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "542301": "日喀则市",
//     "542322": "南木林县",
//     "542323": "江孜县",
//     "542324": "定日县",
//     "542325": "萨迦县",
//     "542326": "拉孜县",
//     "542327": "昂仁县",
//     "542328": "谢通门县",
//     "542329": "白朗县",
//     "542330": "仁布县",
//     "542331": "康马县",
//     "542332": "定结县",
//     "542333": "仲巴县",
//     "542334": "亚东县",
//     "542335": "吉隆县",
//     "542336": "聂拉木县",
//     "542337": "萨嘎县",
//     "542338": "岗巴县",
//     "542339": "其它区"
//   }
//           ]
//         },
//         {
//           value: '那曲地区', label: '那曲地区',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "542421": "那曲县",
//     "542422": "嘉黎县",
//     "542423": "比如县",
//     "542424": "聂荣县",
//     "542425": "安多县",
//     "542426": "申扎县",
//     "542427": "索县",
//     "542428": "班戈县",
//     "542429": "巴青县",
//     "542430": "尼玛县",
//     "542431": "其它区"
//   }
//           ]
//         },
//         {
//           value: '阿里地区', label: '阿里地区',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "542521": "普兰县",
//     "542522": "札达县",
//     "542523": "噶尔县",
//     "542524": "日土县",
//     "542525": "革吉县",
//     "542526": "改则县",
//     "542527": "措勤县",
//     "542528": "其它区"
//   }
//           ]
//         },
//         {
//           value: '林芝地区', label: '林芝地区',
//           children: [
//             {
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//               value: '', label: '',
//             }
//             {
//     "542621": "林芝县",
//     "542622": "工布江达县",
//     "542623": "米林县",
//     "542624": "墨脱县",
//     "542625": "波密县",
//     "542626": "察隅县",
//     "542627": "朗县",
//     "542628": "其它区"
//   }
//           ]
//         }
//       ]
//     },
//     {
//       value: '陕西省', label: '陕西省',
//       children: [
//         {
//           value: '西安市', label: '西安市',
//           children: [
//             {
//               value: '', label: '新城区',
//               value: '', label: '碑林区',
//               value: '', label: '莲湖区',
//               value: '', label: '灞桥区',
//               value: '', label: '未央区',
//               value: '', label: '雁塔区',
//               value: '', label: '阎良区',
//               value: '', label: '临潼区',
//               value: '', label: '长安区',
//               value: '', label: '蓝田县',
//               value: '', label: '周至县',
//               value: '', label: '户县',
//               value: '', label: '高陵县'
//             }
//           ]
//         },
//         {
//           value: '铜川市', label: '铜川市',
//           children: [
//             {
//               value: '', label: '王益区',
//               value: '', label: '印台区',
//               value: '', label: '耀州区',
//               value: '', label: '宜君县'
//             }
//           ]
//         },
//         {
//           value: '宝鸡市', label: '宝鸡市',
//           children: [
//             {
//               value: '', label: '渭滨区',
//               value: '', label: '金台区',
//               value: '', label: '陈仓区',
//               value: '', label: '凤翔县',
//               value: '', label: '岐山县',
//               value: '', label: '扶风县',
//               value: '', label: '眉县',
//               value: '', label: '陇县',
//               value: '', label: '千阳县',
//               value: '', label: '麟游县',
//               value: '', label: '凤县',
//               value: '', label: '太白县'
//             }
//           ]
//         },
//         {
//           value: '咸阳市', label: '咸阳市',
//           children: [
//             {
//               value: '', label: '秦都区',
//               value: '', label: '杨陵区',
//               value: '', label: '渭城区',
//               value: '', label: '三原县',
//               value: '', label: '泾阳县',
//               value: '', label: '乾县',
//               value: '', label: '礼泉县',
//               value: '', label: '永寿县',
//               value: '', label: '彬县',
//               value: '', label: '长武县',
//               value: '', label: '旬邑县',
//               value: '', label: '淳化县',
//               value: '', label: '武功县',
//               value: '', label: '兴平市'
//             }
//           ]
//         },
//         {
//           value: '渭南市', label: '渭南市',
//           children: [
//             {
//               value: '', label: '临渭区',
//               value: '', label: '华县',
//               value: '', label: '潼关县',
//               value: '', label: '大荔县',
//               value: '', label: '合阳县',
//               value: '', label: '澄城县',
//               value: '', label: '蒲城县',
//               value: '', label: '白水县',
//               value: '', label: '富平县',
//               value: '', label: '韩城市',
//               value: '', label: '华阴市'
//             }
//           ]
//         },
//         {
//           value: '延安市', label: '延安市',
//           children: [
//             {
//               value: '', label: '宝塔区',
//               value: '', label: '延长县',
//               value: '', label: '延川县',
//               value: '', label: '子长县',
//               value: '', label: '安塞县',
//               value: '', label: '志丹县',
//               value: '', label: '吴起县',
//               value: '', label: '甘泉县',
//               value: '', label: '富县',
//               value: '', label: '洛川县',
//               value: '', label: '宜川县',
//               value: '', label: '黄龙县',
//               value: '', label: '黄陵县'
//             }
//           ]
//         },
//         {
//           value: '汉中市', label: '汉中市',
//           children: [
//             {
//               value: '', label: '汉台区',
//               value: '', label: '南郑县',
//               value: '', label: '城固县',
//               value: '', label: '洋县',
//               value: '', label: '西乡县',
//               value: '', label: '勉县',
//               value: '', label: '宁强县',
//               value: '', label: '略阳县',
//               value: '', label: '镇巴县',
//               value: '', label: '留坝县',
//               value: '', label: '佛坪县'
//             }
//           ]
//         },
//         {
//           value: '榆林市', label: '榆林市',
//           children: [
//             {
//               value: '', label: '榆阳区',
//               value: '', label: '神木县',
//               value: '', label: '府谷县',
//               value: '', label: '横山县',
//               value: '', label: '靖边县',
//               value: '', label: '定边县',
//               value: '', label: '绥德县',
//               value: '', label: '米脂县',
//               value: '', label: '佳县',
//               value: '', label: '吴堡县',
//               value: '', label: '清涧县',
//               value: '', label: '子洲县'
//             }
//           ]
//         },
//         {
//           value: '安康市', label: '安康市',
//           children: [
//             {
//               value: '', label: '汉滨区',
//               value: '', label: '汉阴县',
//               value: '', label: '石泉县',
//               value: '', label: '宁陕县',
//               value: '', label: '紫阳县',
//               value: '', label: '岚皋县',
//               value: '', label: '平利县',
//               value: '', label: '镇坪县',
//               value: '', label: '旬阳县',
//               value: '', label: '白河县'
//             }
//           ]
//         },
//         {
//           value: '商洛市', label: '商洛市',
//           children: [
//             {
//               value: '', label: '商州区',
//               value: '', label: '洛南县',
//               value: '', label: '丹凤县',
//               value: '', label: '商南县',
//               value: '', label: '山阳县',
//               value: '', label: '镇安县',
//               value: '', label: '柞水县'
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '甘肃省', label: '甘肃省',
//       children: [
//         {
//           value: '兰州市', label: '兰州市',
//           children: [
//             {
//               value: '', label: '城关区',
//               value: '', label: '七里河区',
//               value: '', label: '西固区',
//               value: '', label: '安宁区',
//               value: '', label: '红古区',
//               value: '', label: '永登县',
//               value: '', label: '皋兰县',
//               value: '', label: '榆中县'
//             }
//           ]
//         },
//         {
//           value: '嘉峪关市', label: '嘉峪关市'
//         },
//         {
//           value: '金昌市', label: '金昌市',
//           children: [
//             {
//               value: '', label: '金川区',
//               value: '', label: '永昌县'
//             }
//           ]
//         },
//         {
//           value: '白银市', label: '白银市',
//           children: [
//             {
//               value: '', label: '白银区',
//               value: '', label: '平川区',
//               value: '', label: '靖远县',
//               value: '', label: '会宁县',
//               value: '', label: '景泰县'
//             }
//           ]
//         },
//         {
//           value: '天水市', label: '天水市',
//           children: [
//             {
//               value: '', label: '秦州区',
//               value: '', label: '麦积区',
//               value: '', label: '清水县',
//               value: '', label: '秦安县',
//               value: '', label: '甘谷县',
//               value: '', label: '武山县',
//               value: '', label: '张家川回族自治县'
//             }
//           ]
//         },
//         {
//           value: '武威市', label: '武威市',
//           children: [
//             {
//               value: '', label: '凉州区',
//               value: '', label: '民勤县',
//               value: '', label: '古浪县',
//               value: '', label: '天祝藏族自治县'
//             }
//           ]
//         },
//         {
//           value: '张掖市', label: '张掖市',
//           children: [
//             {
//               value: '', label: '甘州区',
//               value: '', label: '肃南裕固族自治县',
//               value: '', label: '民乐县',
//               value: '', label: '临泽县',
//               value: '', label: '高台县',
//               value: '', label: '山丹县'
//             }
//           ]
//         },
//         {
//           value: '平凉市', label: '平凉市',
//           children: [
//             {
//               value: '', label: '崆峒区',
//               value: '', label: '泾川县',
//               value: '', label: '灵台县',
//               value: '', label: '崇信县',
//               value: '', label: '华亭县',
//               value: '', label: '庄浪县',
//               value: '', label: '静宁县'
//             }
//           ]
//         },
//         {
//           value: '酒泉市', label: '酒泉市',
//           children: [
//             {
//               value: '', label: '肃州区',
//               value: '', label: '金塔县',
//               value: '', label: '安西县',
//               value: '', label: '肃北蒙古族自治县',
//               value: '', label: '阿克塞哈萨克族自治县',
//               value: '', label: '玉门市',
//               value: '', label: '敦煌市'
//             }
//           ]
//         },
//         {
//           value: '庆阳市', label: '庆阳市',
//           children: [
//             {
//               value: '', label: '西峰区',
//               value: '', label: '庆城县',
//               value: '', label: '环县',
//               value: '', label: '华池县',
//               value: '', label: '合水县',
//               value: '', label: '正宁县',
//               value: '', label: '宁县',
//               value: '', label: '镇原县'
//             }
//           ]
//         },
//         {
//           value: '定西市', label: '定西市',
//           children: [
//             {
//               value: '', label: '安定区',
//               value: '', label: '通渭县',
//               value: '', label: '陇西县',
//               value: '', label: '渭源县',
//               value: '', label: '临洮县',
//               value: '', label: '漳县',
//               value: '', label: '岷县'
//             }
//           ]
//         },
//         {
//           value: '陇南市', label: '陇南市',
//           children: [
//             {
//               value: '', label: '武都区',
//               value: '', label: '成县',
//               value: '', label: '文县',
//               value: '', label: '宕昌县',
//               value: '', label: '康县',
//               value: '', label: '西和县',
//               value: '', label: '礼县',
//               value: '', label: '徽县',
//               value: '', label: '两当县'
//             }
//           ]
//         },
//         {
//           value: '临夏回族自治州', label: '临夏回族自治州',
//           children: [
//             {
//               value: '', label: '临夏市',
//               value: '', label: '临夏县',
//               value: '', label: '康乐县',
//               value: '', label: '永靖县',
//               value: '', label: '广河县',
//               value: '', label: '和政县',
//               value: '', label: '东乡族自治县',
//               value: '', label: '积石山保安族东乡族撒拉族自治县'
//             }
//           ]
//         },
//         {
//           value: '甘南藏族自治州', label: '甘南藏族自治州',
//           children: [
//             {
//               value: '', label: '合作市',
//               value: '', label: '临潭县',
//               value: '', label: '卓尼县',
//               value: '', label: '舟曲县',
//               value: '', label: '迭部县',
//               value: '', label: '玛曲县',
//               value: '', label: '碌曲县',
//               value: '', label: '夏河县'
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '青海省', label: '青海省',
//       children: [
//         {
//           value: '西宁市', label: '西宁市',
//           children: [
//             {
//               value: '', label: '城东区',
//               value: '', label: '城中区',
//               value: '', label: '城西区',
//               value: '', label: '城北区',
//               value: '', label: '大通回族土族自治县',
//               value: '', label: '湟中县',
//               value: '', label: '湟源县'
//             }
//           ]
//         },
//         {
//           value: '海东地区', label: '海东地区',
//           children: [
//             {
//               value: '', label: '平安县',
//               value: '', label: '民和回族土族自治县',
//               value: '', label: '乐都县',
//               value: '', label: '互助土族自治县',
//               value: '', label: '化隆回族自治县',
//               value: '', label: '循化撒拉族自治县'
//             }
//           ]
//         },
//         {
//           value: '海北藏族自治州', label: '海北藏族自治州',
//           children: [
//             {
//               value: '', label: '门源回族自治县',
//               value: '', label: '祁连县',
//               value: '', label: '海晏县',
//               value: '', label: '刚察县'
//             }
//           ]
//         },
//         {
//           value: '黄南藏族自治州', label: '黄南藏族自治州',
//           children: [
//             {
//               value: '', label: '同仁县',
//               value: '', label: '尖扎县',
//               value: '', label: '泽库县',
//               value: '', label: '河南蒙古族自治县'
//             }
//           ]
//         },
//         {
//           value: '海南藏族自治州', label: '海南藏族自治州',
//           children: [
//             {
//               value: '', label: '共和县',
//               value: '', label: '同德县',
//               value: '', label: '贵德县',
//               value: '', label: '兴海县',
//               value: '', label: '贵南县'
//             }
//           ]
//         },
//         {
//           value: '果洛藏族自治州', label: '果洛藏族自治州',
//           children: [
//             {
//               value: '', label: '玛沁县',
//               value: '', label: '班玛县',
//               value: '', label: '甘德县',
//               value: '', label: '达日县',
//               value: '', label: '久治县',
//               value: '', label: '玛多县'
//             }
//           ]
//         },
//         {
//           value: '玉树藏族自治州', label: '玉树藏族自治州',
//           children: [
//             {
//               value: '', label: '玉树县',
//               value: '', label: '杂多县',
//               value: '', label: '称多县',
//               value: '', label: '治多县',
//               value: '', label: '囊谦县',
//               value: '', label: '曲麻莱县'
//             }
//           ]
//         },
//         {
//           value: '海西蒙古族藏族自治州', label: '海西蒙古族藏族自治州',
//           children: [
//             {
//               value: '', label: '格尔木市',
//               value: '', label: '德令哈市',
//               value: '', label: '乌兰县',
//               value: '', label: '都兰县',
//               value: '', label: '天峻县'
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '宁夏回族自治区', label: '宁夏回族自治区',
//       children: [
//         {
//           value: '银川市', label: '银川市',
//           children: [
//             {
//               value: '', label: '兴庆区',
//               value: '', label: '西夏区',
//               value: '', label: '金凤区',
//               value: '', label: '永宁县',
//               value: '', label: '贺兰县',
//               value: '', label: '灵武市'
//             }
//           ]
//         },
//         {
//           value: '石嘴山市', label: '石嘴山市',
//           children: [
//             {
//               value: '', label: '大武口区',
//               value: '', label: '惠农区',
//               value: '', label: '平罗县'
//             }
//           ]
//         },
//         {
//           value: '吴忠市', label: '吴忠市',
//           children: [
//             {
//               value: '', label: '利通区',
//               value: '', label: '红寺堡区',
//               value: '', label: '盐池县',
//               value: '', label: '同心县',
//               value: '', label: '青铜峡市'
//             }
//           ]
//         },
//         {
//           value: '固原市', label: '固原市',
//           children: [
//             {
//               value: '', label: '原州区',
//               value: '', label: '西吉县',
//               value: '', label: '隆德县',
//               value: '', label: '泾源县',
//               value: '', label: '彭阳县'
//             }
//           ]
//         },
//         {
//           value: '中卫市', label: '中卫市',
//           children: [
//             {
//               value: '', label: '沙坡头区',
//               value: '', label: '中宁县',
//               value: '', label: '海原县'
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '新疆维吾尔自治区', label: '新疆维吾尔自治区',
//       children: [
//         {
//           value: '乌鲁木齐市', label: '乌鲁木齐市',
//           children: [
//             {
//               value: '', label: '天山区',
//               value: '', label: '沙依巴克区',
//               value: '', label: '新市区',
//               value: '', label: '水磨沟区',
//               value: '', label: '头屯河区',
//               value: '', label: '达坂城区',
//               value: '', label: '东山区',
//               value: '', label: '米东区',
//               value: '', label: '乌鲁木齐县'
//             }
//           ]
//         },
//         {
//           value: '克拉玛依市', label: '克拉玛依市',
//           children: [
//             {
//               value: '', label: '独山子区',
//               value: '', label: '克拉玛依区',
//               value: '', label: '白碱滩区',
//               value: '', label: '乌尔禾区'
//             }
//           ]
//         },
//         {
//           value: '吐鲁番地区', label: '吐鲁番地区',
//           children: [
//             {
//               value: '', label: '吐鲁番市',
//               value: '', label: '鄯善县',
//               value: '', label: '托克逊县'
//             }
//           ]
//         },
//         {
//           value: '哈密地区', label: '哈密地区',
//           children: [
//             {
//               value: '', label: '哈密市',
//               value: '', label: '巴里坤哈萨克自治县',
//               value: '', label: '伊吾县'
//             }
//           ]
//         },
//         {
//           value: '昌吉回族自治州', label: '昌吉回族自治州',
//           children: [
//             {
//               value: '', label: '昌吉市',
//               value: '', label: '阜康市',
//               value: '', label: '米泉市',
//               value: '', label: '呼图壁县',
//               value: '', label: '玛纳斯县',
//               value: '', label: '奇台县',
//               value: '', label: '吉木萨尔县',
//               value: '', label: '木垒哈萨克自治县'
//             }
//           ]
//         },
//         {
//           value: '博尔塔拉蒙古自治州', label: '博尔塔拉蒙古自治州',
//           children: [
//             {
//               value: '', label: '博乐市',
//               value: '', label: '精河县',
//               value: '', label: '温泉县'
//             }
//           ]
//         },
//         {
//           value: '巴音郭楞蒙古自治州', label: '巴音郭楞蒙古自治州',
//           children: [
//             {
//               value: '', label: '库尔勒市',
//               value: '', label: '轮台县',
//               value: '', label: '尉犁县',
//               value: '', label: '若羌县',
//               value: '', label: '且末县',
//               value: '', label: '焉耆回族自治县',
//               value: '', label: '和静县',
//               value: '', label: '和硕县',
//               value: '', label: '博湖县'
//             }
//           ]
//         },
//         {
//           value: '阿克苏地区', label: '阿克苏地区',
//           children: [
//             {
//               value: '', label: '阿克苏市',
//               value: '', label: '温宿县',
//               value: '', label: '库车县',
//               value: '', label: '沙雅县',
//               value: '', label: '新和县',
//               value: '', label: '拜城县',
//               value: '', label: '乌什县',
//               value: '', label: '阿瓦提县',
//               value: '', label: '柯坪县'
//             }
//           ]
//         },
//         {
//           value: '克孜勒苏柯尔克孜自治州', label: '克孜勒苏柯尔克孜自治州',
//           children: [
//             {
//               value: '', label: '阿图什市',
//               value: '', label: '阿克陶县',
//               value: '', label: '阿合奇县',
//               value: '', label: '乌恰县'
//             }
//           ]
//         },
//         {
//           value: '喀什地区', label: '喀什地区',
//           children: [
//             {
//               value: '', label: '喀什市',
//               value: '', label: '疏附县',
//               value: '', label: '疏勒县',
//               value: '', label: '英吉沙县',
//               value: '', label: '泽普县',
//               value: '', label: '莎车县',
//               value: '', label: '叶城县',
//               value: '', label: '麦盖提县',
//               value: '', label: '岳普湖县',
//               value: '', label: '伽师县',
//               value: '', label: '巴楚县',
//               value: '', label: '塔什库尔干塔吉克自治县'
//             }
//           ]
//         },
//         {
//           value: '和田地区', label: '和田地区',
//           children: [
//             {
//               value: '', label: '和田市',
//               value: '', label: '和田县',
//               value: '', label: '墨玉县',
//               value: '', label: '皮山县',
//               value: '', label: '洛浦县',
//               value: '', label: '策勒县',
//               value: '', label: '于田县',
//               value: '', label: '民丰县'
//             }
//           ]
//         },
//         {
//           value: '伊犁哈萨克自治州', label: '伊犁哈萨克自治州',
//           children: [
//             {
//               value: '', label: '伊宁市',
//               value: '', label: '奎屯市',
//               value: '', label: '伊宁县',
//               value: '', label: '察布查尔锡伯自治县',
//               value: '', label: '霍城县',
//               value: '', label: '巩留县',
//               value: '', label: '新源县',
//               value: '', label: '昭苏县',
//               value: '', label: '特克斯县',
//               value: '', label: '尼勒克县'
//             }
//           ]
//         },
//         {
//           value: '塔城地区', label: '塔城地区',
//           children: [
//             {
//               value: '', label: '塔城市',
//               value: '', label: '乌苏市',
//               value: '', label: '额敏县',
//               value: '', label: '沙湾县',
//               value: '', label: '托里县',
//               value: '', label: '裕民县',
//               value: '', label: '和布克赛尔蒙古自治县'
//             }
//           ]
//         },
//         {
//           value: '阿勒泰地区', label: '阿勒泰地区',
//           children: [
//             {
//               value: '', label: '阿勒泰市',
//               value: '', label: '布尔津县',
//               value: '', label: '富蕴县',
//               value: '', label: '福海县',
//               value: '', label: '哈巴河县',
//               value: '', label: '青河县',
//               value: '', label: '吉木乃县'
//             }
//           ]
//         },
//         {
//           value: '石河子市', label: '石河子市'
//         },
//         {
//           value: '阿拉尔市', label: '阿拉尔市'
//         },
//         {
//           value: '图木舒克市', label: '图木舒克市'
//         },
//         {
//           value: '五家渠市', label: '五家渠市'
//         }
//       ]
//     },
//     {
//       value: '台湾省', label: '台湾省',
//       children: [
//         {
//           value: '台北市', label: '台北市',
//           children: [
//             {
//               value: '', label: '中正区',
//               value: '', label: '大同区',
//               value: '', label: '中山区',
//               value: '', label: '松山区',
//               value: '', label: '大安区',
//               value: '', label: '万华区',
//               value: '', label: '信义区',
//               value: '', label: '士林区',
//               value: '', label: '北投区',
//               value: '', label: '内湖区',
//               value: '', label: '南港区',
//               value: '', label: '文山区'
//             }
//           ]
//         },
//         {
//           value: '高雄市', label: '高雄市',
//           children: [
//             {
//               value: '', label: '新兴区',
//               value: '', label: '前金区',
//               value: '', label: '芩雅区',
//               value: '', label: '盐埕区',
//               value: '', label: '鼓山区',
//               value: '', label: '旗津区',
//               value: '', label: '前镇区',
//               value: '', label: '三民区',
//               value: '', label: '左营区',
//               value: '', label: '楠梓区',
//               value: '', label: '小港区'
//             }
//           ]
//         },
//         {
//           value: '台南市', label: '台南市',
//           children: [
//             {
//               value: '', label: '中西区',
//               value: '', label: '东区',
//               value: '', label: '南区',
//               value: '', label: '北区',
//               value: '', label: '安平区',
//               value: '', label: '安南区'
//             }
//           ]
//         },
//         {
//           value: '台中市', label: '台中市',
//           children: [
//             {
//               value: '', label: '中区',
//               value: '', label: '东区',
//               value: '', label: '南区',
//               value: '', label: '西区',
//               value: '', label: '北区',
//               value: '', label: '北屯区',
//               value: '', label: '西屯区',
//               value: '', label: '南屯区'
//             }
//           ]
//         },
//         {
//           value: '金门县', label: '金门县'
//         },
//         {
//           value: '南投县', label: '南投县'
//         },
//         {
//           value: '基隆市', label: '基隆市',
//           children: [
//             {
//               value: '', label: '仁爱区',
//               value: '', label: '信义区',
//               value: '', label: '中正区',
//               value: '', label: '中山区',
//               value: '', label: '安乐区',
//               value: '', label: '暖暖区',
//               value: '', label: '七堵区'
//             }
//           ]
//         },
//         {
//           value: '新竹市', label: '新竹市',
//           children: [
//             {
//               value: '', label: '东区',
//               value: '', label: '北区',
//               value: '', label: '香山区'
//             }
//           ]
//         },
//         {
//           value: '嘉义市', label: '嘉义市',
//           children: [
//             {
//               value: '东区', label: '东区',
//               value: '西区', label: '西区'
//             }
//           ]
//         },
//         {
//           value: '新北市', label: '新北市'
//         },
//         {
//           value: '宜兰县', label: '宜兰县'
//         },
//         {
//           value: '新竹县', label: '新竹县'
//         },
//         {
//           value: '桃园县', label: '桃园县'
//         },
//         {
//           value: '苗栗县', label: '苗栗县'
//         },
//         {
//           value: '彰化县', label: '彰化县'
//         },
//         {
//           value: '嘉义县', label: '嘉义县'
//         },
//         {
//           value: '云林县', label: '云林县'
//         },
//         {
//           value: '屏东县', label: '屏东县'
//         },
//         {
//           value: '台东县', label: '台东县'
//         },
//         {
//           value: '花莲县', label: '花莲县'
//         },
//         {
//           value: '澎湖县', label: '澎湖县'
//         },
//       ]
//     },
//     {
//       value: '香港特别行政区', label: '香港特别行政区',
//       children: [
//         {
//           value: '香港岛', label: '香港岛',
//           children: [
//             {
//               value: '中西区', label: '中西区',
//               value: '', label: '湾仔',
//               value: '', label: '东区',
//               value: '', label: '南区'
//             }
//           ]
//         },
//         {
//           value: '九龙', label: '九龙',
//           children: [
//             {
//               value: '', label: '九龙城区',
//               value: '', label: '油尖旺区',
//               value: '', label: '深水埗区',
//               value: '', label: '黄大仙区',
//               value: '', label: '观塘区'
//             }
//           ]
//         },
//         {
//           value: '新界', label: '新界',
//           children: [
//             {
//               value: '', label: '北区',
//               value: '', label: '大埔区',
//               value: '', label: '沙田区',
//               value: '', label: '西贡区',
//               value: '', label: '元朗区',
//               value: '', label: '屯门区',
//               value: '', label: '荃湾区',
//               value: '', label: '葵青区',
//               value: '', label: '离岛区'
//             }
//           ]
//         }
//       ]
//     },
//     {
//       value: '澳门特别行政区', label: '澳门特别行政区',
//       children: [
//         {
//           value: '', label: '澳门半岛',
//           value: '', label: '离岛',
//         }
//       ]
//     }
//   ]
//   let nextOption = 
//   return hexStr
// }
// export {
//     GetCookie, GetUrlParam, setCookie, GetRequest, parseColor
//     // hexToRgb
// }
