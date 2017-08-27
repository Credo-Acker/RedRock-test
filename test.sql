/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2017-08-27 20:45:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `data`
-- ----------------------------
DROP TABLE IF EXISTS `data`;
CREATE TABLE `data` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `max_temp` float(3,1) NOT NULL,
  `min_temp` float(3,1) NOT NULL,
  `weather` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of data
-- ----------------------------
INSERT INTO `data` VALUES ('1', '39.4', '20.4', '多云');
INSERT INTO `data` VALUES ('2', '10.2', '1.2', '晴');
INSERT INTO `data` VALUES ('3', '30.1', '12.2', '暴雨');
INSERT INTO `data` VALUES ('4', '41.1', '34.2', '冰雹');
INSERT INTO `data` VALUES ('5', '42.1', '22.3', '沙尘暴');
INSERT INTO `data` VALUES ('6', '12.5', '6.6', '台风');
INSERT INTO `data` VALUES ('7', '21.4', '5.2', '雾霾');
