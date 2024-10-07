import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({name, control, label, defaultValue = ''}) {
  return (
    <div>
      {
        label && <label>{label}</label>
      }

      <Controller
        name={name || 'content'}
        control={control}
        render={({field: {onChange}}) => (
          <Editor
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                'image', 
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'code',
                'fullscreen','etccc(check from documentation)'
              ],
              toolbar: 'undo redo | blocks | image |bold italic forecolor | alignleft aligncenter bold italic forecolor (etccc, check from documentation)'
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  )
}