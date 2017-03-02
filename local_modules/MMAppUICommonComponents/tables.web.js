// Copyright (c) 2014-2017, MyMonero.com
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//	conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//	of conditions and the following disclaimer in the documentation and/or other
//	materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//	used to endorse or promote products derived from this software without specific
//	prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
"use strict"
//
const View = require('../Views/View.web')
const commonComponents_cssRules = require('./cssRules.web')
//
const NamespaceName = "Tables"
const haveCSSRulesBeenInjected_documentKey = "__haveCSSRulesBeenInjected_"+NamespaceName
const cssRules =
[
	`.table_field {
		padding: 0;
	}`,
	`.table_field a.clickableLinkButton {
		
	}`,
	`.table_field .field_value {
		
	}`,
	`.table_field .field_value a,
	.table_field .field_value a:active,
	.table_field .field_value a:hover
	{
		color: #FFFFFF;
		cursor: default;
		text-decoration: none;
	}`,
	`.table_field .field_value p {
		display: block;
		padding: 0 0 18px 0;
		word-break: break-word;
	}`
]
function __injectCSSRules_ifNecessary()
{
	commonComponents_cssRules.InjectCSSRules_ifNecessary(haveCSSRulesBeenInjected_documentKey, cssRules)
}
//
function New_fieldContainerLayer()
{
	const layer = document.createElement("div")
	layer.className = "table_field"
	//
	return layer
}
exports.New_fieldContainerLayer = New_fieldContainerLayer
//
function New_clickableLinkButtonView(buttonTitle, context, clicked_fn)
{
	clicked_fn = clicked_fn || function() {}
	//
	const view = new View({ tag: "a" }, context)
	const a = view.layer
	a.className = "clickableLinkButton"
	a.innerHTML = buttonTitle
	a.style.color = "#11bbec"
	a.style.cursor = "pointer"
	a.style.fontFamily = context.themeController.FontFamily_monospace()
	a.style.fontSize = "11px"
	a.style.fontWeight = "100"
	a.style.display = "inline-block" // to get margin capability
	a.style.margin = "8px 0 0 9px"
	a.addEventListener("mouseenter", function()
	{
		if (view.isEnabled !== false) {
			a.style.textDecoration = "underline"
		} else {
			a.style.textDecoration = "none"
		}
	})
	a.addEventListener("mouseleave", function()
	{
		a.style.textDecoration = "none"
	})
	view.SetEnabled = function(isEnabled)
	{
		view.isEnabled = isEnabled
		if (isEnabled) {
			a.style.color = "#11bbec"
			a.style.cursor = "pointer"
		} else {
			a.style.color = "#bbbbbb"
			a.style.cursor = "default"
		}
	}
	a.addEventListener("click", function(e)
	{
		e.preventDefault()
		if (view.isEnabled !== false) {
			clicked_fn()
		}
		return false
	})
	view.SetEnabled(true)
	//
	return view
}
exports.New_clickableLinkButtonView = New_clickableLinkButtonView
//
function New_fieldTitle_labelLayer(labelText, context)
{
	__injectCSSRules_ifNecessary()
	//
	const layer = document.createElement("span")
	{
		layer.innerHTML = labelText
		layer.style.float = "left"
		layer.style.textAlign = "left"
		layer.style.fontSize = "12px" // design says 13 but it's too big..?
		layer.style.fontWeight = "400" // semibold desired
		layer.style.color = "#FFFFFF"
		layer.style.letterSpacing = "0.5px"
		layer.style.fontFamily = context.themeController.FontFamily_sansSerif()
	}				
	return layer
}
exports.New_fieldTitle_labelLayer = New_fieldTitle_labelLayer
//
function New_fieldValue_labelLayer(labelText, context)
{
	__injectCSSRules_ifNecessary()
	//
	const layer = document.createElement("span")
	{
		layer.innerHTML = labelText
		layer.className = "field_value"
		layer.style.float = "right"
		layer.style.textAlign = "right"
		layer.style.fontSize = "13px"
		layer.style.color = "#9E9C9E"
		layer.style.fontWeight = "100"
		layer.style.fontFamily = context.themeController.FontFamily_monospace()
	}
	return layer
}
exports.New_fieldValue_labelLayer = New_fieldValue_labelLayer
//
function New_separatorLayer()
{
	__injectCSSRules_ifNecessary()
	//
	const layer = document.createElement("div")
	{
		layer.style.width = "calc(100% - 15px)"
		layer.style.marginLeft = "15px"
		layer.style.height = "1px"
		layer.style.backgroundColor = "#666"
		layer.style.color = "#ccc"
	}				
	return layer
}
exports.New_separatorLayer = New_separatorLayer
//
function New_copyButton_aLayer(context, value, enabled_orTrue, pasteboard, pasteboard_valueContentType_orText, optl_didCopy_fn)
{
	__injectCSSRules_ifNecessary()
	var didCopy_fn = optl_didCopy_fn || function(runtime_valueToCopy, runtime_pasteboard_valueContentType_orText) {}
	//
	const layer = document.createElement("a")
	{ // setup
		layer.innerHTML = "COPY"
		layer.style.marginTop = "1px" // per design
		layer.style.float = "right"
		layer.style.textAlign = "right"
		layer.style.fontSize = "15px"
		layer.style.fontFamily = context.themeController.FontFamily_sansSerif()
		layer.style.fontWeight = "500"
		layer.style.fontSize = "11px"
		layer.style.textDecoration = "none"
		layer.addEventListener("mouseenter", function()
		{
			if (layer.Component_IsEnabled !== false) {
				layer.style.textDecoration = "underline"
			} else {
				layer.style.textDecoration = "none"
			}
		})
		layer.addEventListener("mouseleave", function()
		{
			layer.style.textDecoration = "none"
		})
	}
	var runtime_valueToCopy = value
	var runtime_pasteboard_valueContentType_orText = pasteboard_valueContentType_orText
	{ // component fns
		layer.Component_SetEnabled = function(enabled)
		{
			layer.Component_IsEnabled = enabled
			if (enabled !== false) {
				layer.href = "#" // to make it look clickable
				layer.style.opacity = "1"
				layer.style.cursor = "pointer"
				layer.style.color = "#00C6FF"
			} else {
				layer.href = ""
				layer.style.opacity = "0.2"
				layer.style.cursor = "default"
				layer.style.color = "#CCCCCC"
			}
		}
		layer.Component_SetValue = function(to_value, to_pasteboard_valueContentType_orText)
		{
			runtime_valueToCopy = to_value
			runtime_pasteboard_valueContentType_orText = to_pasteboard_valueContentType_orText
			if (to_value === "" || typeof to_value === 'undefined' || !to_value) {
				layer.Component_SetEnabled(false)
			} else {
				layer.Component_SetEnabled(true)
			}
		}
	}
	{ // initial config
		layer.Component_SetEnabled(enabled_orTrue)
	}
	{ // start observing
		layer.addEventListener(
			"click",
			function(e)
			{
				e.preventDefault()
				{
					if (layer.Component_IsEnabled !== false) {
						pasteboard.CopyString(
							runtime_valueToCopy, 
							runtime_pasteboard_valueContentType_orText
						)
						didCopy_fn(
							runtime_valueToCopy, 
							runtime_pasteboard_valueContentType_orText
						)
					}
				}
				return false
			}
		)
	}
	return layer
}
exports.New_copyButton_aLayer = New_copyButton_aLayer
//
function New_redTextButtonView(text, context)
{
	__injectCSSRules_ifNecessary()
	//
	const view = new View({ tag: "a" }, context)
	const layer = view.layer
	layer.innerHTML = text
	//
	layer.style.display = "block" // own line
    layer.style.float = "left" // but do not let it have 100% width
	layer.style.clear = "left" // but do not let it have 100% width 
	layer.style.marginLeft = "22px"
	//
	layer.style.color = "#F97777"
	layer.style.fontFamily = context.themeController.FontFamily_monospace()
	layer.style.fontSize = "10px" // design says 11 but chrome renders too large; simulating…
	layer.style.letterSpacing = "0.5px"
	layer.style.fontWeight = "100"
	//
	layer.style.textDecoration = "none"
	//
	layer.addEventListener(
		"mouseenter",
		function()
		{
			if (view.isEnabled !== false) {
				layer.style.textDecoration = "underline"
			}
		}
	)
	layer.addEventListener(
		"mouseleave",
		function()
		{
			layer.style.textDecoration = "none"
		}
	)
	view.SetEnabled = function(isEnabled)
	{
		view.isEnabled = isEnabled
		if (isEnabled) {
			layer.href = "#"
			layer.style.opacity = "1"
			layer.style.cursor = "pointer"
			layer.classList.remove("disabled")
		} else {
			layer.href = ""
			layer.style.opacity = "0.7"
			layer.style.cursor = "default"
			layer.classList.add("disabled")
		}
	}
	view.SetEnabled(true)
	//
	return view
}
exports.New_redTextButtonView = New_redTextButtonView
//
function New_deleteRecordNamedButtonView(humanReadable_recordName, context, optl_replacementVerbString)
{
	const verbString = optl_replacementVerbString || "DELETE"
	const text = verbString + " " + humanReadable_recordName.toUpperCase() + "…"
	const view = New_redTextButtonView(text, context)

	return view
}
exports.New_deleteRecordNamedButtonView = New_deleteRecordNamedButtonView
//
function New_createNewRecordNamedButton_aLayer(
	lowercased_humanReadable_recordName
)
{
	__injectCSSRules_ifNecessary()
	//
	const layer = document.createElement("a")
	{
		layer.innerHTML = "+ CREATE NEW " + lowercased_humanReadable_recordName
		layer.href = "#" // to make it look clickable
		//
		layer.style.display = "block" // own line
		//
		layer.style.textDecoration = "none"
		layer.style.fontSize = "12px"
		layer.style.fontWeight = "bold"
		layer.style.color = "blue" // TODO
		layer.addEventListener(
			"mouseenter",
			function()
			{
				layer.style.textDecoration = "underline"
			}
		)
		layer.addEventListener(
			"mouseleave",
			function()
			{
				layer.style.textDecoration = "none"
			}
		)
	}
	return layer
}
exports.New_createNewRecordNamedButton_aLayer = New_createNewRecordNamedButton_aLayer
//
function New_clearingBreakLayer()
{
	const layer = document.createElement("br")
	layer.clear = "both"
	//
	return layer
}
exports.New_clearingBreakLayer = New_clearingBreakLayer
//
function New_spacerLayer()
{
	__injectCSSRules_ifNecessary()
	//
	const layer = document.createElement("div")
	layer.style.width = "100%"
	layer.style.height = "40px" // just tentative - feel free to customize
	//
	return layer
}
exports.New_spacerLayer = New_spacerLayer
//
function New_inlineMessageDialogLayer(messageString, immediatelyVisible)
{ // NOTE: These are configured to not be visible at first
	__injectCSSRules_ifNecessary()
	//
	const layer = document.createElement("div")
	layer.innerHTML = messageString
	layer.style.border = "1px solid #ccc"
	layer.style.backgroundColor = "#333"
	layer.style.margin = "0 0 10px 0"
	layer.style.display = immediatelyVisible === true ? "block" : "none" // initial visibility
	{
		layer.SetValidationError = function(to_messageString)
		{
			if (to_messageString === "") {
				layer.ClearAndHideMessage()
				return
			}
			layer.innerHTML = to_messageString
			layer.style.display = "block"
		}
		layer.ClearAndHideMessage = function()
		{
			layer.innerHTML = ""
			layer.style.display = "none"
		}
	}
	{
		// TODO: add X button which removes layer from parent (i think)
	}
	return layer
}
exports.New_inlineMessageDialogLayer = New_inlineMessageDialogLayer
//
function New_copyable_longStringValueField_component_fieldContainerLayer(
	context,
	fieldLabelTitle, 
	value,
	pasteboard, 
	valueToDisplayIfValueNil_orDefault,
	optl_isTruncatedPreviewForm // single line, … trunc, etc
)
{ 
	__injectCSSRules_ifNecessary()
	//
	const isTruncatedPreviewForm = optl_isTruncatedPreviewForm == true ? true : false
	//
	const isValueNil = value === null || typeof value === 'undefined' || value === ""
	const valueToDisplay = isValueNil === false ? value : valueToDisplayIfValueNil_orDefault
	const div = New_fieldContainerLayer()
	const padding_btm = isTruncatedPreviewForm ? 12 : 19
	div.style.padding = `15px 0 ${padding_btm}px 0`
	var labelLayer = New_fieldTitle_labelLayer(fieldLabelTitle, context)
	var copy_buttonLayer = New_copyButton_aLayer(
		context,
		value,
		isValueNil === false ? true : false,
		pasteboard
	)
	var valueLayer = New_fieldValue_labelLayer("" + valueToDisplay, context)
	if (isTruncatedPreviewForm == false) {
		div.appendChild(labelLayer)
		{
			copy_buttonLayer.style.float = "right"
			div.appendChild(copy_buttonLayer)
		}
		{
			const clearingBreakLayer = document.createElement("br")
			clearingBreakLayer.clear = "both"
			div.appendChild(clearingBreakLayer)
		}
		{
			valueLayer.style.float = "left"
			valueLayer.style.textAlign = "left"
			valueLayer.style.marginTop = "9px"
			valueLayer.style.maxWidth = "270px"
			div.appendChild(valueLayer)
		}
	} else {
		{
			labelLayer.style.float = "left"
			div.appendChild(labelLayer)
		}
		{
			valueLayer.style.maxWidth = "156px"
			valueLayer.style.float = "left"
			valueLayer.style.whiteSpace = "nowrap"
			valueLayer.style.overflow = "hidden"
			valueLayer.style.textOverflow = "ellipsis"
			valueLayer.style.marginLeft = "16px"
			div.appendChild(valueLayer)
		}
		{
			div.appendChild(copy_buttonLayer)
		}
	}
	div.appendChild(New_clearingBreakLayer()) // preserve height; better way?
	div.Component_SetValue = function(to_value)
	{
		const to_value_isNil = to_value === null || typeof to_value === 'undefined' || to_value === ""
		const to_valueToDisplay = !to_value_isNil ? ""+to_value : valueToDisplayIfValueNil_orDefault
		valueLayer.innerHTML = to_valueToDisplay
		copy_buttonLayer.Component_SetValue(to_value)
	}
	div.Component_GetLabelLayer = function() { return labelLayer } // kinda gross… TODO: make this into a View component
	return div
}
exports.New_copyable_longStringValueField_component_fieldContainerLayer = New_copyable_longStringValueField_component_fieldContainerLayer
//
function New_tableCell_accessoryChevronLayer()
{
	__injectCSSRules_ifNecessary()
	//
	const image_filename = "list_rightside_chevron.png"
	const layer = document.createElement("img")
	layer.src = "../../MMAppUICommonComponents/Resources/" + image_filename
	layer.style.position = "absolute"
	layer.style.width = "7px"
	const h = 12
	layer.style.height = `${h}px`
	layer.style.right = "16px"
	layer.style.top = `calc(50% - ${h / 2}px)`
	return layer
}
exports.New_tableCell_accessoryChevronLayer = New_tableCell_accessoryChevronLayer
//
function New_tableCell_separatorLayer()
{
	const layer = document.createElement("div")
	layer.style.background = "#413e40"
	layer.style.position = "absolute"
	layer.style.bottom = "-0.5px" // instead of 0… to make sure hover effects look nicer (but it might not do much in the end)
	layer.style.height = "1px"
	const margin_left = 50
	layer.style.width = `calc(100% - ${margin_left}px)`
	layer.style.left = `${margin_left}px`
	layer.style.visibility = "visible" // to be configured
	return layer
}
exports.New_tableCell_separatorLayer = New_tableCell_separatorLayer